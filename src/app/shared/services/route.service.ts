import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;        
      };

      if(event instanceof Scroll) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.routerEvent.url;        
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
