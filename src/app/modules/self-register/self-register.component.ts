import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import { PermissionModel, ProfileModel, UserModel, UserRequestModel } from 'app/models/user-model';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { FormValidation } from 'app/shared/form-validation/form-validation.component';
import { isEmpty } from 'app/shared/utils/utils';
import { SecurityService } from 'app/security/services/security.service';

@Component({
  selector: 'self-register',
  templateUrl: './self-register.component.html',
  styleUrls: ['./self-register.component.scss']
})
export class SelfRegisterComponent extends GenericComponent implements OnInit {


  public form: FormGroup;
  public canShowForm: boolean = false;

  private user: UserModel;
  private userId: number;
  public profiles: ProfileModel[] = [];
  public permissions: PermissionModel[] = [];


  focus;
  focus1;
  focus2;
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(private element : ElementRef,  private formBuilder: FormBuilder,
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private securityService: SecurityService,
      private swalManagService: SwalManagementService) {
        super();
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    ngOnInit(){

      this.fetchUserResources();
      // TODO: Solicitar um end-point que traga perfis e permissoes para o auto-registo(Sem necessidade de autenticacao)


        

        
        
        
        // **************TEMPLATE ****************
        this.checkFullPageBackgroundImage();
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
        // ****************TEMPLATE****************
    }

    public fetchUserResources(): void {
      // this.createForm();
      // this.canShowForm = true;
      this.userService.fetchUserResources().subscribe(
        (resources) => {
          this.profiles = resources.profiles;
          this.permissions = resources.permissions;
          this.createForm();
          this.canShowForm = true;
        }
      )
    }


    public createForm(): void {
      this.form = this.formBuilder.group({
        id: [null],
        // name: [null, [Validators.required]],
        // mobile: [null, [Validators.required, FormValidation.phone]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        profiles: [null],
        permissions: [null]
      });
    }



    public onSubmit(): void {
      // console.log(this.getFormRequestData(this.form));
      // this.isValidForm;
      // return;

      if (this.isValidForm(this.form)) {
        this.securityService.register(this.getFormRequestData(this.form));
      }
      
      // if (this.isValidForm(this.form)) {
      //   this.securityService.registerUser(this.getFormRequestData(this.form));
        
      //   let requestUserData: UserModel = this.getFormRequestData(this.form);
      //   this.userService.saveUser(requestUserData).subscribe(
      //     (user) => {
      //       this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "/auth/login")
      //     }
      //   );
      // } else {
      //   return;
      // }
  
  
    }
  
    private getFormRequestData(form: any) {
  
      let formRequestData : UserRequestModel = form.value;
      let tempProfiles: ProfileModel[] = [];
      let tempProfileIds: number[] = [];
      let tempPermissionIds: number[] = [];

      tempProfiles = this.profiles.filter(p => {
        if(p.code === 'COMPLAINER') {
          tempProfileIds.push(p.id);
          return true;
        }
      })
      
      tempProfiles.forEach(profile => {
        let profilePermissions = profile.permissions;

        profilePermissions.forEach(profilePermission => {
          let alreadExists = tempPermissionIds.some( tempPermissionId => tempPermissionId === profilePermission.id)
          if(!alreadExists) {
            tempPermissionIds.push(profilePermission.id);
          }
        });        
      })

  
      formRequestData.profileIds = tempProfileIds;
      formRequestData.permissionIds = tempPermissionIds;      
      formRequestData.email = isEmpty(form.value?.email) ? null : form.value?.email.toLowerCase();
  
      return formRequestData;
    }



    // *****************TEMPLATE ****************
    checkFullPageBackgroundImage(){
      var $page = $('.full-page');
      var image_src = $page.data('image');
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      if(image_src !== undefined){
          var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
          $page.append(image_container);
      }
  };
    
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }


    ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
  }
  // ******************TEMPLATE ****************

}
