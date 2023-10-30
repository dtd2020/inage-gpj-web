import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'guest-complainer-layout',
  templateUrl: './guest-complainer-layout.component.html',
  styleUrls: ['./guest-complainer-layout.component.scss']
})
export class GuestComplainerLayoutComponent {


  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(private element: ElementRef) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {

    // TODO: Solicitar um end-point que traga perfis e permissoes para o auto-registo(Sem necessidade de autenticacao)







    // **************TEMPLATE ****************
    this.checkFullPageBackgroundImage();
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700)
    // ****************TEMPLATE****************
  }

  // *****************TEMPLATE ****************
  checkFullPageBackgroundImage() {
    var $page = $('.full-page');
    var image_src = $page.data('image');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    if (image_src !== undefined) {
      var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
      $page.append(image_container);
    }
  }

  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }


  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

}
