import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComplainerModel } from 'app/models/complainer-model';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { ComplainerService } from 'app/services/complainer.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'complainer-list',
  templateUrl: './complainer-list.component.html',
  styleUrls: ['./complainer-list.component.scss']
})
export class ComplainerListComponent extends GenericComponent implements OnInit{

  public complainers: ComplainerModel[];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null,
    filter: null
  };

  constructor(private complainerService: ComplainerService, private router: Router, private swalManagService: SwalManagementService) { 
    super();
  }

  ngOnInit(): void {
    this.fetchAllComplainersPageable();
  }

  public fetchAllComplainersPageable(): void {
    this.complainerService.fetchAllComplainersPageable(this.pageRequest).subscribe(
      (complainerPageable) => {
        this.pageableMeta = complainerPageable.pageableMeta;
        this.complainers = complainerPageable.data;       
      }
    )
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.fetchAllComplainersPageable();
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter = event;
      this.fetchAllComplainersPageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.fetchAllComplainersPageable();
  }

  
  public complainerEdit(complainerId: number) {
    this.router.navigate([`back-office/public-server/complainers/create-edit/${complainerId}`]);
  }
  
  public complainerDetails(complainerId: number) {
    this.router.navigate([`back-office/public-server/complainers/details/${complainerId}`]);
  }

}
