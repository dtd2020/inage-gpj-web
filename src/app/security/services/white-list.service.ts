import { Injectable } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class WhiteListService {

  private whiteListRoutes = new Map();
  private documentWhiteListRoutes = new Map();
  private spinnerWhiteListRoutes = new Map();
  private POST = 'POST';
  private GET = 'GET';
  private PUT = 'PUT';

  constructor(private clientService: ClientService) { 
    this.build();
  }

  public build() {
    this.whiteListRoutes.set(this.clientService.urlAuthWS('/auth/login'), this.POST);
    this.whiteListRoutes.set(this.clientService.urlAuthWS('/auth/self-register'), this.POST);
    this.whiteListRoutes.set(this.clientService.urlAuthWS('/users/fetch-resources'), this.GET);
    this.whiteListRoutes.set(this.clientService.urlAuthWS('/users/reset-password'), this.POST);

    // Document whitelist routes
    this.documentWhiteListRoutes.set(this.clientService.urlProcessingWS('/processes/attachment/single-upload'), this.POST);
    this.documentWhiteListRoutes.set(this.clientService.urlProcessingWS('/processes/attachment/batch-upload'), this.POST);


    // 
    this.spinnerWhiteListRoutes.set(this.clientService.urlProcessingWS('/alert/find-all-unread-by-user-id'), this.GET);
  }

  isWhiteListRoute(path: string, method: string) : boolean {    
    const httpMethod = this.whiteListRoutes.get(path);
    if(httpMethod && httpMethod === method) {
      return true;
    }
    return false;
  }

  isDcoumentWhiteListRoute(path: string, method: string) : boolean {    
    const httpMethod = this.documentWhiteListRoutes.get(path);
    if(httpMethod && httpMethod === method) {
      return true;
    }
    return false;
  }
  
  
  isSPinnerWhiteListRoute(path: string, method: string) : boolean {  
    if(path.includes('complainws/alert/find-all-unread-by-user-id') && method === this.GET) {
      return true;
    } 
    return false;
  }
}
