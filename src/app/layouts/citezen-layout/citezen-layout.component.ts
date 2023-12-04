import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import { PopStateEvent } from '@angular/common';
import { CitezenNavbarComponent } from './citezen-navbar/citezen-navbar.component';
import { SecurityService } from 'app/security/services/security.service';
import { LocalUserModel } from 'app/security/models/local-user';
import { BusinessAlertModel } from 'app/models/business-alert-model';
import { isEmpty } from 'app/shared/utils/utils';
import { BusinessAlertService } from 'app/services/business-alert.service';

@Component({
  selector: 'citezen-layout',
  templateUrl: './citezen-layout.component.html',
  styleUrls: ['./citezen-layout.component.scss']
})
export class CitezenLayoutComponent implements OnInit{

  private _router: Subscription;
  // url: string;
   url: string;
   location: Location;
   private lastPoppedUrl: string;
     private yScrollStack: number[] = [];
  @ViewChild('citezen-sidebar', {static: false}) sidebar;
  @ViewChild(CitezenNavbarComponent, {static: false}) navbar: CitezenNavbarComponent;


  public loggedUser: LocalUserModel;
  private getAlertTimer: any;
  private alerts: BusinessAlertModel[];


  constructor( private router: Router, location:Location, private securityService: SecurityService, private businessAlertService: BusinessAlertService) {
    this.location = location;
  }

  ngOnInit() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev:PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });
     this.router.events.subscribe((event:any) => {
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           }
           else
               window.scrollTo(0, 0);
       }
    });
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
         elemMainPanel.scrollTop = 0;
         elemSidebar.scrollTop = 0;
    });
    const html = document.getElementsByTagName('html')[0];
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
        html.classList.add('perfect-scrollbar-on');
    }
    else {
        html.classList.add('perfect-scrollbar-off');
    }
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.navbar.sidebarClose();
    });


     // ====================================================================================================================
     this.securityService.localUserObservar.subscribe((user) => {
      this.loggedUser = user;
    });

    if(!isEmpty(this.loggedUser)){
      // this.showAlertsOnInit(this.loggedUser?.id);
      this.findAllUnreadAlertsByUserId(this.loggedUser?.id);
    }

    this.getAlerts();
  }





  public isMap(){
      // console.log(this.location.prepareExternalUrl(this.location.path()));
      if(this.location.prepareExternalUrl(this.location.path()) == '#/maps/fullscreen'){
          return true;
      }
      else {
          return false;
      }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

  private getAlerts() : void {

    this.getAlertTimer = setInterval(() => {

      if(!isEmpty(this.loggedUser)){
        this.findAllUnreadAlertsByUserId(this.loggedUser?.id);
      }
      
    }, 30*1000);

  }

  private findAllUnreadAlertsByUserId(userId: number) : void {
    this.businessAlertService.findAllUnreadAlertsByUserId(userId).subscribe(
      (alerts) => {
        this.alerts = alerts;
      }
    )
  }

//   private showAlertsOnInit(userId: number) : void {
//     this.businessAlertService.findAllUnreadAlertsByUserId(userId).subscribe(
//       (alerts: BusinessAlertModel[]) => {
//        this.alerts = alerts;     
//       }
//     )
// }

//   private showAlertsOnInterval(userId: number) : void {
//     this.businessAlertService.findAllUnreadAlertsByUserId(userId).subscribe(
//       (alerts: BusinessAlertModel[]) => {
//         this.addAlert(alerts);     
//       }
//     )
//   }

//   private addAlert(alerts: BusinessAlertModel[]) : void {
//     alerts.forEach((alert: BusinessAlertModel) => {
//       if(!this.alerts.some(thiAlert => thiAlert?.id === alert?.id)) {
//         this.alerts.push(alert);        
//       }
//     })
//   }


  ngOnDestroy() {
    clearInterval(this.getAlertTimer);  
      
  }

}
