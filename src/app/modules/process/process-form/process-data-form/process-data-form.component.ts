import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintTypeEnum } from 'app/models/enums/complaint-type-enum';
import { ProcessTypeEnum } from 'app/models/enums/process-type-enum';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import { ProcessDataOutputForm } from 'app/models/OutputFormData-model';
import { ComplaintTypeModel, ProcessModel, ProcessTypeModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { ProcessStep } from '../process-form.component';



@Component({
  selector: 'process-data-form',
  templateUrl: './process-data-form.component.html',
  styleUrls: ['./process-data-form.component.scss']
})
export class ProcessDataFormComponent extends GenericComponent implements OnInit {

  public form: FormGroup;
  public canShowForm: boolean = false;

  public processTypes: ProcessTypeModel[] = ProcessTypeEnum.asArray;
  public complaintTypes: ComplaintTypeModel[] = ComplaintTypeEnum.asArray;

  @Input() step: boolean = false;
  @Input() process: ProcessModel;
  @Output() outputData: EventEmitter<ProcessDataOutputForm> = new EventEmitter<ProcessDataOutputForm>();
  

  constructor(private formBuilder: FormBuilder, private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {

   this.createForm();
   this.canShowForm = true;
   
  }

  public createForm() {

    this.form = this.formBuilder.group({
      processType: [this.process?.processType, [Validators.required]],
      complaintType: [this.process?.complaintType, [Validators.required]],
      description: [this.process?.description, [Validators.required]],
    });
  }

  

  public onPrevious() {

    let outputDataForm: ProcessDataOutputForm = {
      process: this.getFormRequestData(this.form),
      stepDirection: StepDirectionEnum.PREVIOUS.value
    };
    this.outputData.emit(outputDataForm);
  }

  public onNext() {


    if(!this.isValidForm(this.form)) {
      return;
    }

    let outputData: ProcessDataOutputForm = {
      process: this.getFormRequestData(this.form),
      stepDirection: StepDirectionEnum.NEXT.value
    }

    if(this.step) {
      this.outputData.emit(outputData);
    } else {
      throw new Error("Nao é um step");
    }    
  }


  public getFormRequestData(form: any) : ProcessModel{
    let formRequestData : ProcessModel = form.value;
    return formRequestData;
  }

}
