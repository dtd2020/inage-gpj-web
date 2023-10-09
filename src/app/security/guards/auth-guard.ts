import { SecurityService } from "app/security/services/security.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.securityService.localUser != null) {
      if (!this.securityService.isTokenExpired()) {
        return true;
      } else {
        // TODO: refresh token
        this.securityService.logout();
        this.router.navigate["/auth/login"];
      }
    } else {
      this.securityService.logout();
      this.router.navigate["/auth/login"];
    }
    return true;
  }
}
