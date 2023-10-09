import { Location, PopStateEvent } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackOfficeNavbarComponent } from './back-office-navbar/back-office-navbar.component';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'back-office-layout',
  templateUrl: './back-office-layout.component.html',
  styleUrls: ['./back-office-layout.component.scss']
})
export class BackOfficeLayoutComponent implements OnInit{

  private _router: Subscription;
  // url: string;
   url: string;
   location: Location;
   private lastPoppedUrl: string;
     private yScrollStack: number[] = [];
  @ViewChild('back-office-sidebar', {static: false}) sidebar;
  @ViewChild(BackOfficeNavbarComponent, {static: false}) navbar: BackOfficeNavbarComponent;
  constructor( private router: Router, location:Location ) {
    this.location = location;
  }

  ngOnInit() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.back-office-sidebar .sidebar-wrapper');
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

}
