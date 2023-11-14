import { Component, Input, OnInit } from '@angular/core';
import { AllocationCommentModel, AllocationModel } from 'app/models/allocation-model';
import { AttachmentModel } from 'app/models/attachment-model';
import { ProcessModel } from 'app/models/process-model';
import { AttachmentService } from 'app/services/attachment.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'allocation-details',
  templateUrl: './allocation-details.component.html',
  styleUrls: ['./allocation-details.component.scss']
})
export class AllocationDetailsComponent extends GenericComponent implements OnInit{

  @Input() process: ProcessModel;
  @Input() allocation: AllocationModel;
  @Input() allocationComments: AllocationCommentModel[] = [];

  private canShowDetails: boolean = false;

  constructor(private attachmentService: AttachmentService) { 
    super();
  }

  ngOnInit(): void {
    
    if(!isEmpty(this.process)) {
      this.canShowDetails = true;
    }
  }

  public preview(attachment: AttachmentModel) {
    this.attachmentService.downloadAttachmentById(attachment);
  }

}
