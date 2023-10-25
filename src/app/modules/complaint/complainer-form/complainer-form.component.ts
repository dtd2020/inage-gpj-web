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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SwalManagementService } from 'app/shared/swal-management.service';

@Component({
  selector: 'complainer-form',
  templateUrl: './complainer-form.component.html',
  styleUrls: ['./complainer-form.component.scss']
})
export class ComplainerFormComponent extends GenericComponent implements OnInit {


  public form: FormGroup;
  public canShowForm: boolean = false;
  public loggedUser: LocalUserModel;

  @Input() complainer?: ComplainerModel;
  @Input() step: boolean = false;
  @Output() outputData = new EventEmitter<ComplainerOutputForm>();

  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router, private securityService: SecurityService, private processService: ProcessService, private complainerService: ComplainerService, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {

    this.createForm(this.complainer);
    this.canShowForm = true;
    this.loggedUser = this.securityService.localUser;
    if(!isEmpty(this.loggedUser)) {
      this.findComplainerByUserId(this.loggedUser?.id);
    }

  }

  private findComplainerByUserId(userId: number): void {
    this.complainerService.findComplainerByUserId(userId).subscribe(
      (complainer) => {
        this.complainer = complainer;
        this.createForm();
        this.patchComplainerData(complainer);
       
      }
    )
  }

  public createForm(complainer?: ComplainerModel) {
    this.form = this.formBuilder.group({
      id: [complainer?.id],
      name: [complainer?.name, [Validators.required]],
      email: [complainer?.email, [Validators.required, , Validators.email]],
      mobile: [complainer?.mobile, [Validators.required, FormValidation.phone]],
      address: [complainer?.address, [Validators.required]]
    })
  }

  private patchComplainerData(complainer: ComplainerModel) {
    this.form.patchValue({
      id: complainer?.id,
      name: complainer?.name,
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
    throw new Error(`onSubmit`);
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
