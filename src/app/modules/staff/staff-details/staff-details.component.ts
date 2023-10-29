import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffModel } from 'app/models/staff-model';
import { ComplainerService } from 'app/services/complainer.service';
import { StaffService } from 'app/services/staff.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent extends GenericComponent implements OnInit{

  public staff: StaffModel;

  constructor(private route: ActivatedRoute, private staffService: StaffService, private router: Router, private swalManagService: SwalManagementService) { 
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(!isEmpty(params?.staffId)) {
        this.findStaffById(params?.staffId);
      }
    })    
  }

  public findStaffById(staffId): void {
    this.staffService.findStaffById(staffId).subscribe(
      (staff) => {
        this.staff = staff;        
      }
    )
  }

}
