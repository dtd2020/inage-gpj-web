import { Component, OnInit } from "@angular/core";
import { RouteModel } from "app/models/route.model";
import { LocalUserModel } from "app/security/models/local-user";
import { SecurityService } from "app/security/services/security.service";

@Component({
  selector: "back-office-sidebar",
  templateUrl: "./back-office-sidebar.component.html",
  styleUrls: ["./back-office-sidebar.component.scss"],
})
export class BackOfficeSidebarComponent implements OnInit {
  private readonly ROUTES2: any[] = [

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
      collapse: 'allocations',
      type: 'sub',
      icontype: 'nc-icon nc-book-bookmark',
      children: [
        { path: '/list-all', title: 'Listar alocações', ab: 'LA' },
        { path: '/all-mine', title: 'Minhas alocações', ab: 'AP' },
        { path: '/batch-allocation', title: 'Alocar processos', ab: 'AP' }
      ]
    }
  ];


  private ADMIN_ROUTES: RouteModel[] = [

    {
      path: "/back-office/users/list",
      title: "Utilizadores",
      collapse: '',
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
      children: [
      ]
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
      collapse: '',
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
      children: [
      ]
    },

    {
      path: '/back-office/allocations',
      title: 'Alocações',
      collapse: 'allocations',
      type: 'sub',
      icontype: 'nc-icon nc-book-bookmark',
      children: [
        { path: '/list-all', title: 'Listar alocações', ab: 'LA' },
        { path: '/all-mine', title: 'Minhas alocações', ab: 'AP' },
        { path: '/batch-allocation', title: 'Alocar processos', ab: 'AP' }
      ]
    }
  ];

  private COORDENATOR_OUTES: RouteModel[] = [

    {
      path: "/back-office/users/list",
      title: "Utilizadores",
      collapse: '',
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
      children: [
      ]
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
      collapse: '',
      type: "link",
      icontype: "nc-icon nc-single-copy-04",
      children: [
      ]
    },

    {
      path: '/back-office/allocations',
      title: 'Alocações',
      collapse: 'allocations',
      type: 'sub',
      icontype: 'nc-icon nc-book-bookmark',
      children: [
        { path: '/list-all', title: 'Listar alocações', ab: 'LA' },
        { path: '/all-mine', title: 'Minhas alocações', ab: 'AP' },
        { path: '/batch-allocation', title: 'Alocar processos', ab: 'AP' }
      ]
    }
  ];

  private ACCESSOR_OUTES: RouteModel[] = [

   




    {
      path: '/back-office/allocations',
      title: 'Alocações',
      collapse: 'allocations',
      type: 'sub',
      icontype: 'nc-icon nc-book-bookmark',
      children: [
        { path: '/all-mine', title: 'Minhas alocações', ab: 'AP' }
      ]
    }
  ];
  private ROUTES: RouteModel[] = [];



  public menuItems: any[];

  public loggedUser: LocalUserModel;

  constructor(private securityService: SecurityService) { }




  ngOnInit() {
    // this.menuItems = this.ROUTES.filter((menuItem) => menuItem);

   

    // ****************************************************************
    this.securityService.localUserObservar.subscribe(
      (user) => {
        this.loggedUser = user;

        if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
          // console.log('1 - ADMIN - COORDINATOR - ACCESSOR');   
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR'))) {
          //  console.log('2 - ADMIN - COORDINATOR - ACCESSOR'); 
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
          //  console.log('3 - ADMIN - COORDINATOR - ACCESSOR'); 
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
          //  console.log('4 - ADMIN - COORDINATOR - ACCESSOR'); 
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN'))) {
          //  console.log('5 - ADMIN - COORDINATOR - ACCESSOR'); 
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR'))) {
          //  console.log('6 - ADMIN - COORDINATOR - ACCESSOR'); 
           this.menuItems = this.ADMIN_ROUTES.filter((menuItem) => menuItem);
         } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
          //  console.log('7 - ACCESSOR'); 
           this.menuItems = this.ACCESSOR_OUTES.filter((menuItem) => menuItem);
          //  console.log(this.ROUTES);
           
         } else {
           console.log('NENHUM');
         }

        // this.menuItems = this.ROUTES.filter((menuItem) => {

        //   if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
        //    console.log('1 - ADMIN - COORDINATOR - ACCESSOR');       
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR'))) {
        //     console.log('2 - ADMIN - COORDINATOR - ACCESSOR'); 
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
        //     console.log('3 - ADMIN - COORDINATOR - ACCESSOR'); 
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR')) && (this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
        //     console.log('4 - ADMIN - COORDINATOR - ACCESSOR'); 
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ADMIN'))) {
        //     console.log('5 - ADMIN - COORDINATOR - ACCESSOR'); 
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'COORDINATOR'))) {
        //     console.log('6 - ADMIN - COORDINATOR - ACCESSOR'); 
        //     return menuItem;
        //   } else if ((this.loggedUser.profiles.some(profile => profile.code == 'ACCESSOR'))) {
        //     console.log('7 - ACCESSOR'); 
        //     if (menuItem.title == 'Alocações') {
        //       console.log('ALOCACOES');
              
        //       return menuItem
        //     }
        //   } else {
        //     console.log('NENHUM');
        //   }
    
        // })
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
