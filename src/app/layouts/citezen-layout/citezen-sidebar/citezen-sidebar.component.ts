import { Component } from "@angular/core";
import { SecurityService } from "app/security/services/security.service";

import { LocalUserModel } from "./../../../security/models/local-user";

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  collapse?: string;
  icontype: string;
  // icon: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
// export const ROUTES: RouteInfo[] = [{
//         path: '/dashboard',
//         title: 'Dashboard',
//         type: 'link',
//         icontype: 'nc-icon nc-bank'
//     },{
//         path: '/components',
//         title: 'Components',
//         type: 'sub',
//         collapse: 'components',
//         icontype: 'nc-icon nc-layout-11',
//         children: [
//             {path: 'buttons', title: 'Buttons', ab:'B'},
//             {path: 'grid', title: 'Grid System', ab:'GS'},
//             {path: 'panels', title: 'Panels', ab:'P'},
//             {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
//             {path: 'notifications', title: 'Notifications', ab:'N'},
//             {path: 'icons', title: 'Icons', ab:'I'},
//             {path: 'typography', title: 'Typography', ab:'T'}
//         ]
//     },{
//         path: '/forms',
//         title: 'Forms',
//         type: 'sub',
//         collapse: 'forms',
//         icontype: 'nc-icon nc-ruler-pencil',
//         children: [
//             {path: 'regular', title: 'Regular Forms', ab:'RF'},
//             {path: 'extended', title: 'Extended Forms', ab:'EF'},
//             {path: 'validation', title: 'Validation Forms', ab:'VF'},
//             {path: 'wizard', title: 'Wizard', ab:'W'}
//         ]
//     },{
//         path: '/tables',
//         title: 'Tables',
//         type: 'sub',
//         collapse: 'tables',
//         icontype: 'nc-icon nc-single-copy-04',
//         children: [
//             {path: 'regular', title: 'Regular Tables', ab:'RT'},
//             {path: 'extended', title: 'Extended Tables', ab:'ET'},
//             {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
//         ]
//     },{
//         path: '/maps',
//         title: 'Maps',
//         type: 'sub',
//         collapse: 'maps',
//         icontype: 'nc-icon nc-pin-3',
//         children: [
//             {path: 'google', title: 'Google Maps', ab:'GM'},
//             {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
//             {path: 'vector', title: 'Vector Map', ab:'VM'}
//         ]
//     },{
//         path: '/widgets',
//         title: 'Widgets',
//         type: 'link',
//         icontype: 'nc-icon nc-box'

//     },{
//         path: '/charts',
//         title: 'Charts',
//         type: 'link',
//         icontype: 'nc-icon nc-chart-bar-32'

//     },{
//         path: '/calendar',
//         title: 'Calendar',
//         type: 'link',
//         icontype: 'nc-icon nc-calendar-60'
//     },{
//         path: '/pages',
//         title: 'Pages',
//         collapse: 'pages',
//         type: 'sub',
//         icontype: 'nc-icon nc-book-bookmark',
//         children: [
//             {path: 'timeline', title: 'Timeline Page', ab:'T'},
//             {path: 'user', title: 'User Page', ab:'UP'},
//             {path: 'login', title: 'Login Page', ab:'LP'},
//             {path: 'register', title: 'Register Page', ab:'RP'},
//             {path: 'lock', title: 'Lock Screen Page', ab:'LSP'}
//         ]
//     }
// ];

export const ROUTES: RouteInfo[] = [
  // {
  //   path: "/citezen",
  //   title: "Inicio",
  //   type: "link",
  //   icontype: "nc-icon nc-bank",
  // },
  {
    path: "/citezen/processes/list",
    title: "Processos",
    type: "link",
    icontype: "nc-icon nc-single-copy-04",
  }
];

@Component({
  selector: "citezen-sidebar",
  templateUrl: "./citezen-sidebar.component.html",
  styleUrls: ["./citezen-sidebar.component.scss"],
})
export class CitezenSidebarComponent {
  
  public menuItems: any[];
  public loggedUser: LocalUserModel;

  constructor(private securityService: SecurityService) {}

  
  

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    // ****************************************************************
    this.securityService.localUserObservar.subscribe((user) => {
      this.loggedUser = user;
    });
  }
  ngAfterViewInit() {}

  isNotMobileMenu() {
    if (window.outerWidth > 991) {
      return false;
    }
    return true;
  }
}
