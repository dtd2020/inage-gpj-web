import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'process-list-allocated',
  templateUrl: './process-list-allocated.component.html',
  styleUrls: ['./process-list-allocated.component.scss']
})
export class ProcessListAllocatedComponent extends GenericComponent implements OnInit{

  public processes: ProcessModel[] = [];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null,
    filter: null
  };

  constructor(private router: Router, private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {
  //  this.fetchAllAllocatedProcesses();
  this.fetchAllAllocatedProcessesPageable();
  }


  // public fetchAllAllocatedProcesses() {
  //   this.processService.fetchAllAllocatedProcesses().subscribe(
  //     (processes) => {
  //       this.processes = processes;
  //     }
  //   )    
  // }
  
  public fetchAllAllocatedProcessesPageable() {
    this.processService.fetchAllAllocatedProcessesPageable(this.pageRequest).subscribe(
      (processePageable) => {
        this.processes = processePageable.data;
        this.pageableMeta = processePageable.pageableMeta;
      }
    )    
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.fetchAllAllocatedProcessesPageable();
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter = event;
      this.fetchAllAllocatedProcessesPageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.fetchAllAllocatedProcessesPageable();
  }

  public processDetails(processId: number) {
    this.router.navigate([`back-office/processes/details/${processId}`]);
  }

}
