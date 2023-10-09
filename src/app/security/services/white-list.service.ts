import { Injectable } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class WhiteListService {

  private whiteListRoutes = new Map();
  private POST = 'POST';
  private GET = 'GET';
  private PUT = 'PUT';

  constructor(private clientService: ClientService) { 
    this.build();
  }

  public build() {
    this.whiteListRoutes.set(this.clientService.urlAuthWS('/auth/login'), this.POST);
  }

  isWhiteListRoute(path: string, method: string) : boolean {
    const httpMethod = this.whiteListRoutes.get(path);
    if(httpMethod && httpMethod === method) {
      return true;
    }
    return false;
  }
}
