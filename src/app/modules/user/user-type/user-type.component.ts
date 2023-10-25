import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTypeEnum } from 'app/models/enums/user-type-enum';
import { UserTypeModel } from 'app/models/user-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';

@Component({
  selector: 'user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent extends GenericComponent implements OnInit {

  public form: FormGroup;
  public canShowForm: boolean = false;

  public userTypes : UserTypeModel[] = UserTypeEnum.asArray;


  constructor(private router: Router, private formBuilder: FormBuilder, private processService: ProcessService) {
    super();
  }
   

  ngOnInit(): void {
    this.createForm();
   this.canShowForm = true;
  }

  

   public createForm() {

    this.form = this.formBuilder.group({
      userType: [null, [Validators.required]]
    });
  }

  public onSubmit() {
    this.router.navigate(['/back-office/users/create-edit'], { queryParams: {userType: this.form?.value.userType }});
  }


  public getFormRequestData(form: any) : UserTypeModel{
    let formRequestData = form.value;
    return formRequestData;
  }

}
