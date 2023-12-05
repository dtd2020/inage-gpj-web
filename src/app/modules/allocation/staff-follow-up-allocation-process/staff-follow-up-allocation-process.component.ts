import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllocationCommentModel, AllocationFollowUpRequestModel, AllocationModel } from 'app/models/allocation-model';
import { ClosureTypeEnum } from 'app/models/enums/closure-type-enum';
import { ProcessStatusEnum } from 'app/models/enums/process-status-enum';
import { ClosureTypeModel, ProcessModel, ProcessStatusModel } from 'app/models/process-model';
import { LocalUserModel } from 'app/security/models/local-user';
import { SecurityService } from 'app/security/services/security.service';
import { AllocationService } from 'app/services/allocation.service';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'staff-follow-up-allocation-process',
  templateUrl: './staff-follow-up-allocation-process.component.html',
  styleUrls: ['./staff-follow-up-allocation-process.component.scss']
})
export class StaffFollowUpAllocationProcessComponent extends GenericComponent implements OnInit {

  private loggedUser: LocalUserModel;
  private processId: string;
  public process: ProcessModel;
  private allocation: AllocationModel;
  private allocations: AllocationModel[] = [];
  private allocationComments: AllocationCommentModel[] = [];
  private alertId: number;

  public allocationStatuses: ProcessStatusModel[] = ProcessStatusEnum.asArray;
  public closureTypes: ClosureTypeModel[] = ClosureTypeEnum.asArray;

  private canShowAllocationDetails = false;
  private canShowFollowUpProcessAllocation = false;

  constructor(private route: ActivatedRoute, private location: Location, private securityService: SecurityService, private processService: ProcessService, private allocationService: AllocationService, private swalManagService: SwalManagementService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;
    

    this.route.params.subscribe(params => {   

      if (!isEmpty(params?.allocationId)) {

        let allocationId = params?.allocationId;

        this.route.queryParams.subscribe(params => {

          this.alertId = params?.alertId;
          if (!isEmpty(this.alertId)) {
            this.fetchAllocationById(allocationId, params?.alertId);
          } else {
            this.fetchAllocationById(allocationId);
          }
        })
        
      }
    })

  }


  private fetchAllocationById(allocationId: number, alertId?: number): void {    
    this.allocationService.fetchAllocationByIdWithCommentHistory(allocationId, alertId).subscribe(
      (allocation) => {
        this.setInitData(allocation);
      }
    )
  }


  // private fetchProcessById(processId: number) : void {
  //   this.processService.fetchProcessById(processId).subscribe(
  //     (process) => {
  //       this.setInitData(process);
  //     }
  //   )
  // }

  private setInitData(allocation: AllocationModel) {   
    this.setProcess(allocation?.process); 
    this.setAllocation(allocation);   
    this.setAllocationComments(allocation);
    this.setAllocationStatuses();
    this.setClosureTypes();
    this.canShowAllocationDetails = true;
    this.canShowFollowUpProcessAllocation = true;
    
    
  }

  private setProcess(process: ProcessModel) : void {
    this.process = process;
  }

  private setAllocation(allocation: AllocationModel): void {
    // this.allocations = allocations;
    // let openedAllocations = allocations.filter(all => all.closed == false);
    // if (openedAllocations.length == 1) {
    //   // TODO: Garantir que esta alocacao pertence ao utilizador logado para
    //   this.allocation = openedAllocations[0];

    // } else if (openedAllocations.length > 1) {
    //   this.swalManagService.sweetAlterError("O processo tem mais de uma alocação aberta. Por favor, contacte a gestão da aplicação.");
    //   this.location.back();
    // }

    // allocations.forEach(all => {
    //   all.allocationComments.forEach(comment => {
    //     this.allocationComments.push(comment);      })
    // });
    this.allocation = allocation;
    
  }

  private setAllocationComments(allocation: AllocationModel) : void {
    this.allocationComments = allocation.allocationComments;
  }


  private setAllocationStatuses(): void {
    this.allocationStatuses = this.allocationStatuses.filter(s => {
      let currentAllocationStatus = this.allocation.status;
      if (s.key != ProcessStatusEnum.PENDING.key && s.key != ProcessStatusEnum.ALLOCATED.key) {
        return true;
      }
    })
  }

  private setClosureTypes(): void {
    this.closureTypes = this.closureTypes;
  }

  private onOutputAllocationData(allocationRequestData: AllocationFollowUpRequestModel): void {    
    this.allocationService.allocationFollowUp(allocationRequestData).subscribe(
      () => {
        this.swalManagService.sweetAlterSuccess("Operação realizada com sucesso!", "/back-office/allocations/all-mine");
      }
    )
  }

}
