import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'app/services/allocation.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { AllocationModel } from 'app/models/allocation-model';
import { isEmpty } from 'app/shared/utils/utils';
import { RouteService } from 'app/shared/services/route.service';
import { LocalUserModel } from 'app/security/models/local-user';
import { SecurityService } from 'app/security/services/security.service';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';

@Component({
  selector: 'allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.scss']
})
export class AllocationListComponent extends GenericComponent implements OnInit {

  public loggedUser: LocalUserModel;
  public allocations: AllocationModel[] = [];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null,
    filter: null
  };

  public canShowFollowUpOption: boolean = false;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private routerService: RouteService, private securityService: SecurityService, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService){
    super();
  }
  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;


    if(this.routerService.getCurrentUrl().includes("all-mine")) {      
      if(!isEmpty(this.loggedUser)) {
        this.fetchAllMyAllocationsPageable(this.loggedUser?.id)
      } else {
        this.location.back();
      }      
    } else {      
      this.fetchAllAllocationsPageable();
    }
    
  }

  // public fetchAllAllocations(): void {
  //   this.allocationService.fetchAllAllocations().subscribe(
  //     (allocations) => {
  //       this.allocations = allocations;
  //     }
  //   );
  // }
  
  public fetchAllAllocationsPageable(): void {
    this.allocationService.fetchAllAllocationsPageable(this.pageRequest).subscribe(
      (allocationPageable) => {
        this.allocations = allocationPageable.data;
        this.pageableMeta = allocationPageable.pageableMeta;
      }
    );
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    if(this.routerService.getCurrentUrl().includes("all-mine")) {
      this.fetchAllMyAllocationsPageable(this.loggedUser?.id);
    } else {
    this.fetchAllAllocationsPageable();
    }
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter = event;
      this.fetchAllAllocationsPageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.fetchAllAllocationsPageable();
  }

  public fetchAllMyAllocationsPageable(userId: number): void {
    this.allocationService.fetchAllMyAllocationsPageable(userId, this.pageRequest).subscribe(
      (allocationPageable) => {
        this.allocations = allocationPageable.data;
        this.pageableMeta = allocationPageable.pageableMeta;
        this.canShowFollowUpOption = true;
      }
    );
  }

  public followUpAllocation(allocationId: number) {
    this.router.navigate([`/back-office/allocations/allocation-follow-up/${allocationId}`]);
    
  }
}
