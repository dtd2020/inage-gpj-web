import { Location } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SwalManagementService } from './../../shared/swal-management.service';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private location: Location, private router: Router, private securityService: SecurityService, private swalManagService: SwalManagementService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(

      catchError(ex => {
        if (ex instanceof HttpErrorResponse) {          
          
          if(ex.error.message.includes('JWT expired')) {
            this.swalManagService.sweetAlterError("A sua sessão expirou!")
            this.securityService.logout();
            this.router.navigate["/auth/login"];
          } else {
            this.swalManagService.sweetAlterError(ex.message)
          }
          
          return throwError(ex);
        }
        
      })

    )
  }





}
