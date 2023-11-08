import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeGuard implements CanActivate {

  constructor(private location: Location, private securityService: SecurityService, private swalManagService: SwalManagementService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoles = this.securityService.localUser.profiles;
    let isAuthorized = false;

      if(userRoles.some(uRole => {
        if(uRole.code == 'ADMIN' || uRole.code == 'COORDINATOR' || uRole.code == 'ACCESSOR') {
          return true;
        }
      })) {
        isAuthorized = true; 
      } else {
        this.swalManagService.sweetAlterError("Sem permissão!");
        this.location.back();
      }

    return isAuthorized;
  }
  
}
