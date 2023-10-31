import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplainerModel } from 'app/models/complainer-model';
import { ComplainerTypeEnum } from 'app/models/enums/complainer-type-enum';
import { ProcessTypeEnum } from 'app/models/enums/process-type-enum';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import {
  AttachmentOutputForm,
  ComplainerOutputForm,
  DetailsOutputForm,
  ProcessDataOutputForm,
} from 'app/models/OutputFormData-model';
import { ComplainerTypeModel, ProcessModel, ProcessTypeModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { take } from 'rxjs';

export enum ProcessStep {
  PROCESS_DATA_FORM = 'process_data_form',
  COMPLAINT_FORM = 'complaint_form',
  ATTACHMENT_FORM = 'attachment_form',
  DETAILS = 'details'
}

declare var $: any;
@Component({
  selector: 'process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss']
})



export class ProcessFormComponent extends GenericComponent implements OnInit {


  public form: FormGroup;
  public complaint: ComplainerModel;
  // private step$ = new BehaviorSubject<string>('');
  public step : string = '';
  public canShowProcessDataForm = false;
  public canShowComplaintForm = false;
  public canShowAttachmentForm = false;
  public canShowDetails = false;
  public isFormValid;

  public processTypes: ProcessTypeModel[] = ProcessTypeEnum.asArray;
  public complaintTypes: ComplainerTypeModel[] = ComplainerTypeEnum.asArray;

  public process: ProcessModel = {
    id: null,
    code: null,
    description: null,
    complainerId: null,
    complainer: null,
    processType: undefined,
    complainerType: undefined,
    closureType: undefined,
    processStatus: undefined,
    attachments: [],
    updateHistory: undefined
  };

  constructor(private router: Router, private formBuilder: FormBuilder, private processService: ProcessService, private swalManagService: SwalManagementService) {
    super();
  }



  ngOnInit(): void {
    if(this.step.length <= 0) {
      this.showComplainerForm();
    }
  } 
    
  //   this.processService.step.pipe(take(1)).subscribe(
  //     (step) => {
  //       console.log(step);
        
  //     }
  //   )
  // }

  // public showStepForm(step: string): void {    
  //   console.log(step);
  //   if (step === ProcessStep.PROCESS_DATA_FORM) {
  //     this.showProcessDataForm();
  //   } else if (step === ProcessStep.COMPLAINT_FORM) {
  //     this.showComplaintForm();
  //   } else if (step === ProcessStep.ATTACHMENT_FORM) {
  //     this.showAttachmentForm();
  //   } else if (step === ProcessStep.DETAILS) {
  //     this.showDetails();
  //   }

    
  // }

  

  public showComplainerForm(): void {    
    this.canShowProcessDataForm = false;
    this.canShowComplaintForm = true;
    this.canShowAttachmentForm = false;
    this.canShowDetails = false;
  }

  public showProcessDataForm(): void {
    this.canShowProcessDataForm = true;
    this.canShowComplaintForm = false;
    this.canShowAttachmentForm = false;
    this.canShowDetails = false;
  }

  public showAttachmentForm(): void {
    this.canShowProcessDataForm = false;
    this.canShowComplaintForm = false;
    this.canShowAttachmentForm = true;
    this.canShowDetails = false;
  }
  
  public showDetails(): void {
    this.canShowProcessDataForm = false;
    this.canShowComplaintForm = false;
    this.canShowAttachmentForm = false;
    this.canShowDetails = true;
  }

  public onComplainerForm(event?: ComplainerOutputForm): void {
    
    if (event?.complainer) {
      this.process.complainer = event.complainer;
    }

    if(event?.stepDirection === StepDirectionEnum.NEXT.value) {
      this.showProcessDataForm(); 
    } 
  }

  public onProcessDataForm(event?: ProcessDataOutputForm): void {
   
    if (event?.process) {
      this.process.processType = event?.process?.processType;
      this.process.complainerType = event?.process?.complainerType;
      this.process.description = event?.process?.description;
    }

    if(event?.stepDirection === StepDirectionEnum.NEXT.value) {
      this.showAttachmentForm(); 
    }   else if(event?.stepDirection === StepDirectionEnum.PREVIOUS.value) {
      this.showComplainerForm();
    } 
  }

  

  public onAttachmentForm(event?: AttachmentOutputForm): void {
   
    if (event?.attachments) {
      this.process.attachments = event.attachments;
    }

    if(event?.stepDirection === StepDirectionEnum.NEXT.value) {
      this.showDetails(); 
    } else if(event?.stepDirection === StepDirectionEnum.PREVIOUS.value) {
      this.showProcessDataForm();
    }
  }
  
  public onDetails(event?: DetailsOutputForm): void {

    if(event?.stepDirection === StepDirectionEnum.PREVIOUS.value) {
      this.showAttachmentForm(); 
    } else {
      throw new Error("Invalid");
    }
  }




  onSubmit() {
    this.process.complainerId = this.process?.complainer?.id;
    this.processService.createProcess(this.process).subscribe(
      (response) => {
        if(this.router.url.includes('citezen')) {
          this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso", "citezen/processes/list");
        } else {
          this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso", "back-office/processes/list");
        }
        
      }
    )
  }

}
