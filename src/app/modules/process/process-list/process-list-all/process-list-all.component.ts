import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { FilterSearchMapUtilService } from 'app/shared/utils/filter-search-map-util.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'process-list-all',
  templateUrl: './process-list-all.component.html',
  styleUrls: ['./process-list-all.component.scss']
})
export class ProcessListAllComponent extends GenericComponent implements OnInit {

  public processes: ProcessModel[] = [];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null,
    filter: null
  };

  constructor(private processService: ProcessService, private router: Router) {
    super();
  }

  ngOnInit(): void {
   this.fetchAllProcessesPageable();
  }


  // public fetchAllProcesses() {
  //   this.processService.fetchAllProcesses().subscribe(
  //     (processes) => {
  //       this.processes = processes;
  //     }
  //   )    
  // }

  public fetchAllProcessesPageable() {
    this.processService.fetchAllProcessesPageable(this.pageRequest).subscribe(
      (processePageable) => {
        this.processes = processePageable.data;
        this.pageableMeta = processePageable.pageableMeta;
      }
    )    
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.fetchAllProcessesPageable();
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter =  FilterSearchMapUtilService.getFilter(event, 'process');
      this.fetchAllProcessesPageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.fetchAllProcessesPageable();
  }

  public processDetails(processId: number) {
    this.router.navigate([`back-office/processes/details/${processId}`]);
  }

}

