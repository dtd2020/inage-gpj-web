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
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'app/shared/utils/utils';
import { Location } from '@angular/common';
import { AttachmentService } from 'app/services/attachment.service';
import { ClientService } from 'app/security/services/client.service';
import { UploadDownloadService } from 'app/services/upload-download.service';

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

  constructor(private route: ActivatedRoute, private location: Location, private processService: ProcessService, private attachmentService: AttachmentService) {
    super();
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params) => {        
        if (!isEmpty(params?.processId)) {
          this.fetchProcessById(params.processId)
        }
      }
    );
  }

  public fetchProcessById(processId: number) {
    this.processService.fetchProcessById(processId).subscribe(
      (process) => {
        this.process = process;
      }
    )
  }

  onSubmit(): void {
    let outputData: DetailsOutputForm = {
      stepDirection: StepDirectionEnum.NEXT.value
    }

    this.outputData.emit(outputData);
    
    if (this.step) {
      this.outputData.emit(outputData);
    } else {
      this.location.back();
    }

  }

  public previous() {

    let outputData: DetailsOutputForm = {
      stepDirection: StepDirectionEnum.PREVIOUS.value
    }

    this.outputData.emit(outputData);

  }

  public preview(attachment: AttachmentModel) {
    this.attachmentService.downloadAttachmentById(attachment);
  }



}
