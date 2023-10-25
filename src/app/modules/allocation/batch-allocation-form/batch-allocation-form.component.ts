import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { StaffModel } from 'app/models/staff-model';
import { AllocationService } from 'app/services/allocation.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { AllocationBatchModel } from 'app/models/allocation-model';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { Router } from '@angular/router';

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


  constructor(private router: Router, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {    
    this.findAllocationResources();
  }

  public findAllocationResources(): void {
    this.allocationService.findAllocationResources().subscribe(
      (response) => {
        this.processesAvailableToAllocate = response.availableProcessesToAllocate;
        this.staff = response.staff;
        this.createForm();
        this.canShowForm = true;
      }
    )
  }

  public createForm() {

    this.form = this.formBuilder.group({
      staffId: [null, [Validators.required]]
    });
  }

  public addProcess(process: ProcessModel) {
    this.processesToALlocate.push(process);
    this.processesAvailableToAllocate = this.processesAvailableToAllocate.filter(p => p.id !== process?.id);
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
    let batchAllocationData: AllocationBatchModel = this.getFormRequestData(this.form);
    this.allocationService.batchAllocateProcess(batchAllocationData).subscribe(
      (response) => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso.", "/back-office/processes/list");
      }
    )
  }

  public getFormRequestData(form: any): AllocationBatchModel {
    let processesToAllocateIds: number[] = this.processesToALlocate.map(p => p.id);
    let formRequestData: AllocationBatchModel = form.value;
    formRequestData.processIds = processesToAllocateIds;    
    return formRequestData;
  }

}
