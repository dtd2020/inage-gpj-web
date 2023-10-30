import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllocationService } from 'app/services/allocation.service';
import { ProcessService } from 'app/services/process.service';
import { StaffService } from 'app/services/staff.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { RouteService } from 'app/shared/services/route.service';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isEmpty } from 'app/shared/utils/utils';
import { AllocationFollowUpRequestModel, AllocationModel } from 'app/models/allocation-model';
import { AttachmentModel } from 'app/models/attachment-model';
import { ClosureStatusEnum } from 'app/models/enums/closure-status-enum';
import { ClosureStatusModel } from 'app/models/process-model';

@Component({
  selector: 'follow-up-allocation-process',
  templateUrl: './follow-up-allocation-process.component.html',
  styleUrls: ['./follow-up-allocation-process.component.scss']
})
export class FollowUpAllocationProcessComponent extends GenericComponent implements OnInit{

  public form: FormGroup;
  public canShowForm: boolean = false;
  public safeUrl: any;
  public showPreview: boolean = false;
  public canShowDetails: boolean = false;
  public today = new Date();

  public allocation: AllocationModel;
  public allocationStatuses: ClosureStatusModel[] = ClosureStatusEnum.asArray;

  constructor(private route: ActivatedRoute, private routeService: RouteService, private processService: ProcessService, private staffService: StaffService, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService, private sanitizer: DomSanitizer){
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(!isEmpty(params?.allocationId)) {
        this.fetchAllocationById(params?.allocationId);
      }
    })
  }
  

  public fetchAllocationById(allocationId: number) : void {
    this.allocationService.fetchAllocationById(allocationId).subscribe(
      (allocation) => {
        this.allocation = allocation;
        this.allocationStatuses = this.allocationStatuses.filter(s => {
          if(s.key != ClosureStatusEnum.PENDING.key && s.key != ClosureStatusEnum.ALLOCATED.key) {
            return true;
          }
        })
        this.createFollowUpAllocationForm(allocation);
        this.canShowDetails = true;
        if(!allocation?.closed && allocation?.process?.closureStatus != ClosureStatusEnum.CLOSED.key) {
          this.canShowForm = true;
        }
       
      }
    )
  }

  public preview(file: AttachmentModel) {
    this.showPreview = true
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.data);
  }

  public createFollowUpAllocationForm(allocation?: AllocationModel): void {
    this.form = this.formBuilder.group({
      allocationId: [allocation?.id, [Validators.required]],
      allocationStatus: [null, [Validators.required]],
      allocationComment: this.createAllocationCommentForm()
    })
  }

  public createAllocationCommentForm() : FormGroup {
    return this.formBuilder.group({
      title: [null, [Validators.required]],
      comment: [null, [Validators.required]],
      from: ['STAFF', [Validators.required]],
    });
  }

  public onSubmit() {
    if(!this.isValidForm(this.form)) {
      return;
    }
    this.allocationService.allocationFollowUp(this.getFormRequestData(this.form)).subscribe(
      () => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso!", "back-office/allocations/list-all");
      }
    )
    
    
  }


  private getFormRequestData(form: any): AllocationFollowUpRequestModel {
    let formData: AllocationFollowUpRequestModel = form.value;
    return formData;
  }

}