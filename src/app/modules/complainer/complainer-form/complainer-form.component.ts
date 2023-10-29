import { throwError } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplainerOutputForm } from 'app/models/OutputFormData-model';
import { ComplainerModel } from 'app/models/complainer-model';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { isEmpty } from 'app/shared/utils/utils';
import { ProcessService } from 'app/services/process.service';
import { ProcessStep } from 'app/modules/process/process-form/process-form.component';
import { FormValidation } from 'app/shared/form-validation/form-validation.component';
import { SecurityService } from 'app/security/services/security.service';
import { ComplainerService } from 'app/services/complainer.service';
import { LocalUserModel } from 'app/security/models/local-user';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { UserService } from 'app/services/user.service';
import { UserModel } from 'app/models/user-model';
import { RouteService } from 'app/shared/services/route.service';

@Component({
  selector: 'complainer-form',
  templateUrl: './complainer-form.component.html',
  styleUrls: ['./complainer-form.component.scss']
})
export class ComplainerFormComponent extends GenericComponent implements OnInit {


  public form: FormGroup;
  public canShowForm: boolean = false;
  public loggedUser: LocalUserModel;
  public userId: number;
  public complainerId: number;

  @Input() complainer?: ComplainerModel;
  @Input() step: boolean = false;
  @Output() outputData = new EventEmitter<ComplainerOutputForm>();

  constructor(private formBuilder: FormBuilder, private location: Location, private route: ActivatedRoute, private router: Router, private routeService: RouteService, private securityService: SecurityService, private processService: ProcessService, private complainerService: ComplainerService, private userService: UserService, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;

    this.route.params.subscribe(
      (params) => {
        if (!isEmpty(params.complainerId)) {
          this.complainerId = params.complainerId;
        }
      }
    );

    this.route.queryParams.subscribe(
      (params) => {
        if (!isEmpty(params.userId)) {
          this.userId = params.userId;
        }
      }
    );

    

   

    if(!isEmpty(this.userId) && this.step === false) {
      this.findUserByUserId(this.userId);
    } else if(!isEmpty(this.userId) && this.step === true) {
      this.findComplainerByUserId(this.userId);
    } else {

      if(!isEmpty(this.complainerId) && isEmpty(this.complainer)) {
        this.findComplainerById(this.complainerId);
      } else {
        if(!isEmpty(this.complainerId) && !isEmpty(this.complainer)) {
          this.createForm(this.complainer);
          this.canShowForm = true;
        } else {
          this.swalManagService.sweetAlterError("Sistema sem dados pessoais do queixoso! Queira por favor primeiro registar os dados.", (this.routeService.getPreviousUrl()));

        }
      }

      // if(this.step === true) {
      //   this.createForm(this.complainer);
      //   this.canShowForm = true;
      // } else {
        
      // }
      // if(!isEmpty(this.loggedUser)) {
      //   this.findComplainerByUserId(this.loggedUser?.id);
      // }
    }
   

  }

  private findUserByUserId(userId: number): void {
    this.userService.findUserById(userId).subscribe(
      (user) => {
        this.createForm();
        this.patchComplainerWithUserData(user);
        this.canShowForm = true;
       
      }
    )
  }

  private findComplainerById(complainerId: number): void {
    this.complainerService.findComplainerById(complainerId).subscribe(
      (complainer) => {
        this.createForm();
        this.patchComplainerWithComplainerData(complainer);
        this.canShowForm = true;
       
      }
    )
  }

  private findComplainerByUserId(userId: number): void {
    this.complainerService.findComplainerByUserId(userId).subscribe(
      (complainer) => {
        this.createForm();
        this.patchComplainerWithComplainerData(complainer);
        this.canShowForm = true;
       
      }
    )
  }

  public createForm(complainer?: ComplainerModel) {
    this.form = this.formBuilder.group({
      id: [complainer?.id],
      nuit: [complainer?.nuit, [Validators.required]],
      userId: [complainer?.userId],
      name: [complainer?.name, [Validators.required]],
      email: [complainer?.email, [Validators.required, , Validators.email]],
      mobile: [complainer?.mobile, [Validators.required, FormValidation.phone]],
      address: [complainer?.address, [Validators.required]]
    })
  }

  private patchComplainerWithUserData(user: UserModel) {
    this.form.patchValue({
      userId: user?.id,
      // name: user?.name,
      nuit: user?.username,
      email: user?.email,
      // mobile: user?.mobile
    });
    this.canShowForm = true;
  }

  private patchComplainerWithComplainerData(complainer: ComplainerModel) {
    this.form.patchValue({
      id: complainer?.id,
      userId: complainer?.userId,
      name: complainer?.name,
      nuit: complainer?.nuit,
      email: complainer?.email,
      mobile: complainer?.mobile,
      address: complainer?.address
    });
    this.canShowForm = true;
  }

  private getFormRequestData(form: any): ComplainerModel {
    let formData: ComplainerModel = form.value;
    return formData;
  }

  public onSubmit() {
    // if(!this.isValidForm) {
    //   return;
    // }
    console.log((this.getFormRequestData(this.form)));
    
    this.complainerService.saveComplainer(this.getFormRequestData(this.form)).subscribe(
      (complainer) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso!", "back-office/users/list");
      }
    )
  }



  public onNext() {
    if(!this.isValidForm(this.form)){
      return;
    }
    let outputDataForm: ComplainerOutputForm = {
      complainer: this.getFormRequestData(this.form),
      stepDirection: StepDirectionEnum.NEXT.value
    }
    this.outputData.emit(outputDataForm);
  }

  ngOnDestroy() {


  }

}
