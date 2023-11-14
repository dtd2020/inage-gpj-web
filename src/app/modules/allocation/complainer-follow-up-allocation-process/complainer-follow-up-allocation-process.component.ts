import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllocationCommentModel, AllocationFollowUpRequestModel, AllocationModel } from 'app/models/allocation-model';
import { ClosureTypeEnum } from 'app/models/enums/closure-type-enum';
import { ProcessStatusEnum } from 'app/models/enums/process-status-enum';
import { ClosureTypeModel, ProcessModel, ProcessStatusModel } from 'app/models/process-model';
import { AllocationService } from 'app/services/allocation.service';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'complainer-follow-up-allocation-process',
  templateUrl: './complainer-follow-up-allocation-process.component.html',
  styleUrls: ['./complainer-follow-up-allocation-process.component.scss']
})
export class ComplainerFollowUpAllocationProcessComponent extends GenericComponent implements OnInit {

  private processId: string;
  public process: ProcessModel;
  private allocation: AllocationModel;
  private allocations: AllocationModel[] = [];
  private allocationComments: AllocationCommentModel[] = [];
  

  public allocationStatuses: ProcessStatusModel[] = ProcessStatusEnum.asArray;
  public closureTypes: ClosureTypeModel[] = ClosureTypeEnum.asArray;

  private canShowAllocationDetails = false;
  private canShowFollowUpProcessAllocation = false;

  constructor(private route: ActivatedRoute, private location: Location, private processService: ProcessService, private allocationService: AllocationService, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.processId = params.processId;
      if (!isEmpty(params.processId)) {
        this.fetchProcessById(params.processId);
      }
    });
  }

  // TODO fetch process by id using processSerive 

  public fetchProcessById(processId: number): void {
    this.processService.fetchProcessById(processId).subscribe(
      (process) => {

        this.process = process;
        if (!isEmpty(this.process)) {
          this.setInitData(this.process);
        }
      }
    );
  }

  private setInitData(process: ProcessModel): void {

    if (!isEmpty(process?.allocations)) {
      this.setAllocation(process?.allocations);
    }
    this.setAllocationStatuses();
    this.setClosureTypes();
    this.canShowFollowUpProcessAllocation = true;
    this.canShowAllocationDetails = true;
  }

  public setAllocation(allocations: AllocationModel[]): void {
    this.allocations = allocations;
    let openedAllocations = allocations.filter(all => all.closed == false);
    if (openedAllocations.length == 1 && openedAllocations[0].status === ProcessStatusEnum.AWAITING_COMPLAINER_RESPONSE.key) {
      this.allocation = openedAllocations[0];
    } else if (openedAllocations.length > 1) {
      this.swalManagService.sweetAlterError("O processo tem mais de uma alocação aberta. Por favor, contacte a gestão da aplicação.");
      this.location.back();
    }

    allocations.forEach(all => {
      all.allocationComments.forEach(comment => {
        this.allocationComments.push(comment);      })
    });
    
  }

  public setAllocationStatuses(): void {
    this.allocationStatuses = this.allocationStatuses.filter(all => all.key == ProcessStatusEnum.ASSESSMENT_ACESSOR.key);
  }

  private setClosureTypes(): void {
    this.closureTypes = this.closureTypes;
  }


  public onOutputAllocationData(allocationRequestData: AllocationFollowUpRequestModel): void {
    this.allocationService.allocationFollowUp(allocationRequestData).subscribe(
      () => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso!", "/citezen/processes/list");
      }
    )
  }





}
