import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  public url(context: string): string {
    return `${environment.API_BASE_URL}${context}`;
  }

  public urlAuthWS(resource: string): string {
    return this.url(`/authws${resource}`)
  }
  
  public urlProcessingWS(resource: string): string {
    return this.url(`/complainws${resource}`)
  }
}
