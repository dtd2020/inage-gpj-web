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

@Component({
  selector: 'allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.scss']
})
export class AllocationListComponent extends GenericComponent implements OnInit {

  public loggedUser: LocalUserModel;
  public allocations: AllocationModel[] = [];
  public canShowFollowUpOption: boolean = false;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private routerService: RouteService, private securityService: SecurityService, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService){
    super();
  }
  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;


    if(this.routerService.getCurrentUrl().includes("all-mine")) {
      console.log(this.loggedUser);
      
      if(!isEmpty(this.loggedUser)) {
        console.log("USER");
        
        this.fetchAllMyAllocations(this.loggedUser?.id)
      } else {
        this.location.back();
      }
      
    } else {
      console.log("ALL");
      
      this.fetchAllAllocations();
    }
    
  }

  public fetchAllAllocations(): void {
    this.allocationService.fetchAllAllocations().subscribe(
      (allocations) => {
        this.allocations = allocations;
      }
    );
  }

  public fetchAllMyAllocations(userId: number): void {
    this.allocationService.fetchAllMyAllocations(userId).subscribe(
      (allocations) => {
        this.allocations = allocations;
        this.canShowFollowUpOption = true;
      }
    );
  }

  public followUpAllocation(allocationId: number) {
    this.router.navigate([`/back-office/allocations/allocation-follow-up/${allocationId}`]);
    
  }
}
