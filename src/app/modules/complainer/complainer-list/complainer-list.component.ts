import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplainerModel } from 'app/models/complainer-model';
import { ComplainerService } from 'app/services/complainer.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';

@Component({
  selector: 'complainer-list',
  templateUrl: './complainer-list.component.html',
  styleUrls: ['./complainer-list.component.scss']
})
export class ComplainerListComponent extends GenericComponent implements OnInit{

  public complainers: ComplainerModel[];

  constructor(private complainerService: ComplainerService, private router: Router, private swalManagService: SwalManagementService) { 
    super();
  }

  ngOnInit(): void {
    this.fetchAllComplainers();
  }

  public fetchAllComplainers(): void {
    this.complainerService.fetchAllComplainers().subscribe(
      (complainers) => {
        this.complainers = complainers;        
      }
    )
  }

  
  public complainerEdit(complainerId: number) {
    this.router.navigate([`back-office/public-server/complainers/create-edit/${complainerId}`]);
  }
  
  public complainerDetails(complainerId: number) {
    this.router.navigate([`back-office/public-server/complainers/details/${complainerId}`]);
  }

}
