import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordRequestModel } from 'app/models/change-password-request-model';
import { SecurityService } from 'app/security/services/security.service';
import { UserService } from 'app/services/user.service';
import { FormValidation } from 'app/shared/form-validation/form-validation.component';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { RouteService } from 'app/shared/services/route.service';
import { SwalManagementService } from 'app/shared/swal-management.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends GenericComponent implements OnInit{

  form: FormGroup;
  private canShowForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder, private location: Location, private router: Router, private routeService: RouteService, private userService: UserService, private swalManagService: SwalManagementService
  ){
    super()
  }
  ngOnInit(): void {
    this.createForm();
    this.canShowForm = true;
  }




  private createForm() {
    this.form = this.formBuilder.group({
      currentPassword: [null, [Validators.required]],
      password:  [null, [Validators.required]],
      confirmPassword:  [null, [Validators.required]],
    }, 
    { validator: [FormValidation.confirmPassword]});
  }

  private getFormRequestData(form: any): ChangePasswordRequestModel {
    let formData: ChangePasswordRequestModel = {
      currentPassword: form.value.currentPassword,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    };
    
    return formData;
  }

  private onSubmit() {
    if(!this.isValidForm(this.form)){
      return;
    }
    this.userService.changePassword(this.getFormRequestData(this.form)).subscribe(
      (staff) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/users/list")
      }
    )
    
  }

  private cancel() {
    this.location.back();
  }

}
