import { Location } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResetPasswordRequestModel } from "app/models/user-model";
import { LocalUserModel } from "app/security/models/local-user";
import { SecurityService } from "app/security/services/security.service";
import { UserService } from "app/services/user.service";
import { FormValidation } from "app/shared/form-validation/form-validation.component";
import { GenericComponent } from "app/shared/generic/generic.component";
import { RouteService } from "app/shared/services/route.service";
import { SwalManagementService } from "app/shared/swal-management.service";

@Component({
  selector: "password-recover",
  templateUrl: "./password-recover.component.html",
  styleUrls: ["./password-recover.component.scss"],
})
export class PasswordRecoverComponent extends GenericComponent implements OnInit {
  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  public loggedUser: LocalUserModel;
  public canShowBackOfficeSection: boolean = false;
  public canShowCitezenSection: boolean = false;

  form: FormGroup;

  constructor(private element: ElementRef, private formBuilder: FormBuilder, private location: Location, private router: Router, private routeService: RouteService, private userService: UserService, private swalManagService: SwalManagementService, private securityService: SecurityService) {
    super()
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {

    this.securityService.localUserObservar.subscribe((user) => {
      this.loggedUser = user;
      let profiles = this.loggedUser.profiles;
      if (profiles.some((profile) => profile.code === 'COMPLAINER')) {
        this.canShowCitezenSection = true;
      } else {
        this.canShowBackOfficeSection = true;
        this.canShowCitezenSection = true;
      }
    })

    this.createForm();

    // ****************************
    this.checkFullPageBackgroundImage();

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $(".card").removeClass("card-hidden");
    }, 700);
  }


  public createForm(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, FormValidation.nuit]],
      email: [null, [Validators.required, Validators.email]],
      // celular: [""]
    })
  }

  // ****************************

  checkFullPageBackgroundImage() {
    var $page = $(".full-page");
    var image_src = $page.data("image");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
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





  private getFormRequestData(form: any): ResetPasswordRequestModel {
    let formData: ResetPasswordRequestModel = {
      username: form.value.username,
      email: form.value.email,
    };
    
    return formData;
  }

  private onSubmit() {
    if(!this.isValidForm(this.form)){
      return;
    }
    this.userService.ResetPassword(this.getFormRequestData(this.form)).subscribe(
      (staff) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/users/list")
      }
    )
    
  }

  private cancel() {
    this.router.navigate(["auth/login"]);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
