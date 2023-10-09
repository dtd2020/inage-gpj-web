import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WhiteListService } from '../services/white-list.service';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService, private whiteListService: WhiteListService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.whiteListService.isWhiteListRoute(request.url, request.method)) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.securityService.getToken()}`
      }
    })

    return next.handle(request);
  }
}
