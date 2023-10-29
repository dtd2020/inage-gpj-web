import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { LocalUserModel } from 'app/security/models/local-user';
import { StaffModel } from 'app/models/staff-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'app/security/services/security.service';
import { ProcessService } from 'app/services/process.service';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { StaffService } from 'app/services/staff.service';
import { isEmpty } from 'app/shared/utils/utils';
import { FormValidation } from 'app/shared/form-validation/form-validation.component';
import { UserService } from 'app/services/user.service';
import { UserModel } from 'app/models/user-model';
import { Location } from '@angular/common';

@Component({
  selector: 'staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent extends GenericComponent implements OnInit{
  public form: FormGroup;
  public canShowForm: boolean = false;
  public loggedUser: LocalUserModel;
  public userId: number;
  public staffId: number;

  @Input() staff?: StaffModel;
  @Input() step: boolean = false;
  // @Output() outputData = new EventEmitter<ComplainerOutputForm>();

  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router, private route: ActivatedRoute, private securityService: SecurityService, private processService: ProcessService, private staffService: StaffService, private userService: UserService, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {

    this.loggedUser = this.securityService.localUser;

    this.route.queryParams.subscribe(
      (params) => {
        if (!isEmpty(params.userId)) {
          this.userId = params.userId;
        }
      }
    );
    
    this.route.params.subscribe(
      (params) => {
        if (!isEmpty(params.staffId)) {
          this.staffId = params.staffId;
        }
      }
    );

    if(!isEmpty(this.userId)) {
      this.findUserByUserId(this.userId);
      
    } else if(!isEmpty(this.staffId)) {
      this.findStaffById(this.staffId);
    } else {
      this.createForm();
      this.canShowForm = true;
    }
    

  }

  private findUserByUserId(userId: number): void {
    this.userService.findUserById(userId).subscribe(
      (user) => {
        this.createForm();
        this.patchStaffWithUserData(user);      
        this.canShowForm = true; 
      }
    )
  }

  private findStaffById(staffId: number): void {
    this.staffService.findStaffById(staffId).subscribe(
      (staff) => {
        this.createForm();
        this.patchStaffWithStaffData(staff);  
        this.canShowForm = true;     
      }
    )
  }

  public createForm(staff?: StaffModel) {
    this.form = this.formBuilder.group({
      id: [staff?.id],
      userId: [staff?.userId],
      name: [staff?.name, [Validators.required]],
      nuit: [staff?.nuit, [Validators.required]],
      email: [staff?.email, [Validators.required, , Validators.email]],
      mobile: [staff?.mobile, [Validators.required, FormValidation.phone]],
      address: [staff?.address, [Validators.required]]
    })
  }

  private patchStaffWithUserData(user: UserModel) {
    this.form.patchValue({
      name: user?.name,
      userId: user?.id,
      email: user?.email,
      nuit: user?.username,
      mobile: user?.mobile
    });
    this.canShowForm = true;
  }
  
  
  private patchStaffWithStaffData(staff: StaffModel) {
    this.form.patchValue({
      id: staff?.id,
      name: staff?.name,
      userId: staff?.id,
      email: staff?.email,
      nuit: staff?.nuit,
      mobile: staff?.mobile,
      address: staff?.address
    });
    this.canShowForm = true;
  }

  private getFormRequestData(form: any): StaffModel {
    let formData: StaffModel = form.value;
    
    return formData;
  }

  public onSubmit() {
    if(!this.isValidForm(this.form)){
      return;
    }

    this.staffService.saveStaff(this.getFormRequestData(this.form)).subscribe(
      (staff) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "back-office/public-server/staffs/list")
      }
    )
  }



  // public onNext() {
  //   if(!this.isValidForm(this.form)){
  //     return;
  //   }
  //   let outputDataForm: ComplainerOutputForm = {
  //     staff: this.getFormRequestData(this.form),
  //     stepDirection: StepDirectionEnum.NEXT.value
  //   }
  //   this.outputData.emit(outputDataForm);
  // }

  // ngOnDestroy() {


  // }

}
