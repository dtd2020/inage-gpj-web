import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffModel } from 'app/models/staff-model';
import { StaffService } from 'app/services/staff.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'satff-list',
  templateUrl: './satff-list.component.html',
  styleUrls: ['./satff-list.component.scss']
})
export class SatffListComponent extends GenericComponent implements OnInit{

  public staffs: StaffModel[];

  constructor(private staffService: StaffService, private route: ActivatedRoute, private router: Router, private swalManagService: SwalManagementService) { 
    super();
  }

  ngOnInit(): void {    
    this.fetchAllStaffById();    
  }

  public fetchAllStaffById(): void {
    this.staffService.fetchAllStaffes().subscribe(
      (staffs) => {
        this.staffs = staffs;       
      }
    )
  }

  
  public staffDetails(staffId: number) {
    this.router.navigate([`back-office/public-server/staffs/details/${staffId}`]);
  }
  
  public staffEdit(staffId: number) {
    this.router.navigate([`back-office/public-server/staffs/create-edit/${staffId}`]);
   
  }


}
