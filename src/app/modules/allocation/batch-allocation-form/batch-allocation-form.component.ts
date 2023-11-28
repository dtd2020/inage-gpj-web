import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { StaffModel } from 'app/models/staff-model';
import { AllocationService } from 'app/services/allocation.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { BatchAllocationModel } from 'app/models/allocation-model';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { Router } from '@angular/router';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'batch-allocation-form',
  templateUrl: './batch-allocation-form.component.html',
  styleUrls: ['./batch-allocation-form.component.scss']
})
export class BatchAllocationFormComponent extends GenericComponent implements OnInit {


  public form: FormGroup;
  public canShowForm: boolean = false;

  public processesAvailableToAllocate: ProcessModel[] = [];
  public processesToALlocate: ProcessModel[] = [];
  public staff: StaffModel[] = [];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null,
    filter: null
  };



  constructor(private router: Router, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {    
    this.findAllocationResourcesPageable();
  }

  public findAllocationResourcesPageable(): void {
    this.allocationService.findAllocationResourcesPageable(this.pageRequest).subscribe(
      (resourcePageable) => {
        this.processesAvailableToAllocate = resourcePageable?.processPageable?.data;
        this.filterOnPagination();
        this.staff = resourcePageable.staff;
        this.pageableMeta = resourcePageable?.processPageable?.pageableMeta;
        this.createForm();
        this.canShowForm = true;
      }
    )
  }

  private filterOnPagination() {
    this.processesAvailableToAllocate = this.processesAvailableToAllocate.filter(pAvailableToAllocate => {
      if(this.processesToALlocate.some(pToAllocate => pToAllocate?.id === pAvailableToAllocate?.id)) {
        return null;
      } else {
        return true
      }
    })
  }


  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.findAllocationResourcesPageable();
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter = event;
      this.findAllocationResourcesPageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.findAllocationResourcesPageable();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      staffId: [null, [Validators.required]]
    });
  }

  public addProcess(process: ProcessModel) {
    if(this.processesToALlocate.some(p => p?.id === process?.id)) {
      this.swalManagService.sweetAlterError("Processo já adicionado à lista!");
    } else {
      this.processesToALlocate.push(process);
      this.processesAvailableToAllocate = this.processesAvailableToAllocate.filter(p => p.id !== process?.id);
    }  
  }
  

  public removeProcess(process: ProcessModel) {
    this.processesToALlocate = this.processesToALlocate.filter(p => p.id !== process?.id);
    this.processesAvailableToAllocate.push(process);
  }


  onSubmit() {
    if(!this.isValidForm(this.form)) {
      return;
    }
    if(this.processesToALlocate.length < 1) {
      this.swalManagService.sweetAlterError("Obrigatorio adicionar o(s) processo(s).");
      return;
    }
    let batchAllocationData: BatchAllocationModel = this.getFormRequestData(this.form);
    this.allocationService.batchAllocateProcess(batchAllocationData).subscribe(
      (response) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "/back-office/processes/list");
      }
    )
  }

  public getFormRequestData(form: any): BatchAllocationModel {
    let processesToAllocateIds: number[] = this.processesToALlocate.map(p => p.id);
    let formRequestData: BatchAllocationModel = form.value;
    formRequestData.processIds = processesToAllocateIds;    
    return formRequestData;
  }

}
