import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { StaffModel } from 'app/models/staff-model';
import { ProcessService } from 'app/services/process.service';
import { StaffService } from 'app/services/staff.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { RouteService } from 'app/shared/services/route.service';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { BatchAllocationModel, SingleAllocationModel } from 'app/models/allocation-model';
import { AllocationService } from 'app/services/allocation.service';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'app/shared/utils/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentModel } from 'app/models/attachment-model';

@Component({
  selector: 'single-allocation-form',
  templateUrl: './single-allocation-form.component.html',
  styleUrls: ['./single-allocation-form.component.scss']
})
export class SingleAllocationFormComponent extends GenericComponent implements OnInit{

  public form: FormGroup;
  public canShowForm: boolean = false;
  public safeUrl: any;
  public showPreview: boolean = false;

  public process: ProcessModel;
  public staffs: StaffModel[] = [];

  constructor(private route: ActivatedRoute, private routeService: RouteService, private processService: ProcessService, private staffService: StaffService, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService, private sanitizer: DomSanitizer){
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(!isEmpty(params?.processId)) {
        this.fetchProcessById(params?.processId);
      }
    })
  }
  

  public fetchProcessById(processId: number) : void {
    this.processService.fetchProcessById(processId).subscribe(
      (process) => {
        this.process = process;
        this.fetchStaffs();
      }
    )
  }

  public fetchStaffs() : void {
    this.staffService.findAllStaffes().subscribe(
      (staffs) => {
        this.staffs = staffs;
        this.createForm(this.process?.id);
        this.canShowForm = true;
      }
    )
  }

  public createForm(processId?: number) {
    this.form = this.formBuilder.group({
      staffId: [null, [Validators.required]],
      processId: [processId, [Validators.required]],
    });
  }

  public allocate() : void {    
    if(!this.isValidForm(this.form)){
      return;
    }

    this.allocationService.singleAllocateProcess(this.getFormRequestData(this.form)).subscribe(
      () => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso!", "/back-office/processes/list");
      }
    )
  }

  public getFormRequestData(form: any): SingleAllocationModel {
    let formRequestData: SingleAllocationModel = form.value;  
    return formRequestData;
  }

  public preview(attachment: AttachmentModel) {
    this.showPreview = true
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(attachment.fileReaded);
  }


}
