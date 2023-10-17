import { Component, OnInit } from "@angular/core";
import { LocalUserModel } from "app/security/models/local-user";
import { SecurityService } from "app/security/services/security.service";

@Component({
  selector: "back-office-sidebar",
  templateUrl: "./back-office-sidebar.component.html",
  styleUrls: ["./back-office-sidebar.component.scss"],
})
export class BackOfficeSidebarComponent implements OnInit {
  private readonly ROUTES: any[] = [
    // {
    //   path: "/back-office",
    //   title: "Inicio",
    //   type: "link",
    //   icontype: "nc-icon nc-bank",
    // },
    {
      path: "/back-office/users/list",
      title: "Utilizadores",
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
    },
    {
      path: "/back-office/processes/list",
      title: "Processos",
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
    },
  ];

  

  public menuItems: any[];

  public loggedUser: LocalUserModel;

  constructor(private securityService: SecurityService) {}


  

  ngOnInit() {
    this.menuItems = this.ROUTES.filter((menuItem) => menuItem);

    // ****************************************************************
    this.securityService.localUser.subscribe(
      (user) => {
        this.loggedUser = user;
      }
    );
  }

  ngAfterViewInit() {}

  isNotMobileMenu() {
    if (window.outerWidth > 991) {
      return false;
    }
    return true;
  }
}
