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
import { SwalManagementService } from "app/shared/swal-management.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private swalManagService: SwalManagementService,
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
        this.swalManagService.sweetAlterError("A sua sessão expirou!");
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
