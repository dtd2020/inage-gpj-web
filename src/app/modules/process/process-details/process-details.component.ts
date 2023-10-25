import { DetailsOutputForm } from './../../../models/OutputFormData-model';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepDirectionEnum } from 'app/models/enums/step-direction-enum';
import { ProcessModel } from 'app/models/process-model';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { ProcessStep } from '../process-form/process-form.component';
import { ProcessService } from 'app/services/process.service';
import { AttachmentModel } from 'app/models/attachment-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss']
})
export class ProcessDetailsComponent extends GenericComponent implements OnInit {

  public safeUrl: any;
  public showPreview: boolean = false;


  @Input() step: boolean = false;
  @Input() process: ProcessModel;
  @Output() outputData = new EventEmitter<DetailsOutputForm>();

  constructor(private processService: ProcessService,  private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let outputData: DetailsOutputForm = {
      stepDirection: StepDirectionEnum.NEXT.value
    }

    this.outputData.emit(outputData);
    
    if (this.step) {
      this.outputData.emit(outputData);
    } else {
      throw new Error("Não é um step");
    }

  }

  public previous() {

    let outputData: DetailsOutputForm = {
      stepDirection: StepDirectionEnum.PREVIOUS.value
    }

    this.outputData.emit(outputData);

  }

  public preview(file: AttachmentModel) {
    this.showPreview = true
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.data);
  }

}
