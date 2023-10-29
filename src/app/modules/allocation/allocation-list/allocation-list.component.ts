import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'app/services/allocation.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { AllocationModel } from 'app/models/allocation-model';

@Component({
  selector: 'allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.scss']
})
export class AllocationListComponent extends GenericComponent implements OnInit {

  public allocations: AllocationModel[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private allocationService: AllocationService, private formBuilder: FormBuilder, private swalManagService: SwalManagementService){
    super();
  }
  ngOnInit(): void {
    this.fetchAllAllocations();
  }

  public fetchAllAllocations(): void {
    this.allocationService.fetchAllAllocations().subscribe(
      (allocations) => {
        this.allocations = allocations;
      }
    );
  }

  public followUpAllocation(allocationId: number) {
    this.router.navigate([`/back-office/allocations/allocation-follow-up/${allocationId}`]);
    
  }
}
