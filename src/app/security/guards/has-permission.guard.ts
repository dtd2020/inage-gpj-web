import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { PermissionModel } from '../models/local-user';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {

  constructor(private location: Location, private securityService: SecurityService, private swalManagService: SwalManagementService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userPermissions: string[] = this.securityService.localUser?.permissions;
    let dataPermissions: string[] = route.data.permissions;
    let isAuthorized: boolean = false;    

    dataPermissions.forEach((dataPermission) => {
      if(userPermissions.some(userPermission => userPermission == dataPermission)) {
        isAuthorized = true;
      } else {
        this.swalManagService.sweetAlterError("Sem permissão!");
      }
    })
    return isAuthorized;
  }
  
}
