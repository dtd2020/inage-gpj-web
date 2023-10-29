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
      path: "/back-office/public-server",
      title: "Utente",
      collapse: 'public-server',
      type: "sub",
      icontype: "nc-icon nc-single-copy-04",
      children: [
        { path: '/complainers/list', title: 'Reclamante', ab: 'RC' },
        { path: '/staffs/list', title: 'Pessoal de apoio', ab: 'PA' }
      ]
    },

    {
      path: "/back-office/processes/list",
      title: "Processos",
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
    },

    {
      path: '/back-office/allocations',
      title: 'Alocações',
      collapse: 'pages',
      type: 'sub',
      icontype: 'nc-icon nc-book-bookmark',
      children: [
        { path: '/list-all', title: 'Listar alocações', ab: 'LA' },
        { path: '/batch-allocation', title: 'Alocar processos', ab: 'AP' }
      ]
    }
  ];



  public menuItems: any[];

  public loggedUser: LocalUserModel;

  constructor(private securityService: SecurityService) { }




  ngOnInit() {
    this.menuItems = this.ROUTES.filter((menuItem) => menuItem);

    // ****************************************************************
    this.securityService.localUserObservar.subscribe(
      (user) => {
        this.loggedUser = user;
      }
    );
  }

  ngAfterViewInit() { }

  isNotMobileMenu() {
    if (window.outerWidth > 991) {
      return false;
    }
    return true;
  }
}
