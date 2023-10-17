import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from 'app/shared/spinner/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return this.handler(next, request)
  }

  handler(next: HttpHandler, request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this.spinnerService.requestEnded();
            }
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.requestEnded();
          },
          () => {
            this.spinnerService.requestEnded();
          }
        )
      )
  }

}
