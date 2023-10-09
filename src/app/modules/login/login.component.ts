import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestModel } from 'app/security/models/auth-model';
import { SecurityService } from 'app/security/services/security.service';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  form: FormGroup;

  constructor(private element: ElementRef, private formBuilder: FormBuilder, private router: Router, private securityService: SecurityService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }
  checkFullPageBackgroundImage() {
    var $page = $(".full-page");
    var image_src = $page.data("image");

    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    this.createForm();
    // *****************************************************


    this.checkFullPageBackgroundImage();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $(".card").removeClass("card-hidden");
    }, 700);
  }

  // ****************************************





  createForm() {
    this.form = this.formBuilder.group({
      username: [""],
      password: [""],
    });
  }

  login() {
    let loginRequestData: LoginRequestModel = this.form.value;
    this.securityService.attemptLogin(loginRequestData);

  }





























  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("login-page");
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    var sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }
}
