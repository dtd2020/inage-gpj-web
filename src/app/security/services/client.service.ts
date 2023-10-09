import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  public url(context: string): string {
    return `${environment.GPJ_API}${context}`;
  }

  public urlAuthWS(resource: string): string {
    return this.url(`/v1/auth-service${resource}`)
  }
}
