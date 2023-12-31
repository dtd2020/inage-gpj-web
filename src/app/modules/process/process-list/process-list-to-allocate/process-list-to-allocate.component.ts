import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'process-list-to-allocate',
  templateUrl: './process-list-to-allocate.component.html',
  styleUrls: ['./process-list-to-allocate.component.scss']
})
export class ProcessListToAllocateComponent extends GenericComponent implements OnInit {

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
   this.findAllProcessesToAllocatePageable();
  }


  // public findAllProcessesToAllocate() {
  //   this.processService.findAllProcessesToAllocate().subscribe(
  //     (processes) => {
  //       this.processes = processes;
  //     }
  //   )    
  // }

  public findAllProcessesToAllocatePageable() {
    this.processService.findAllProcessesToAllocatePageable(this.pageRequest).subscribe(
      (processePageable) => {
        this.processes = processePageable.data;
        this.pageableMeta = processePageable.pageableMeta;
      }
    )    
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.findAllProcessesToAllocatePageable();
  }

  private onSearchEvent(event: string): void {
    if(!isEmpty(event)) {
      this.pageRequest.offset = 0;
      this.pageRequest.filter = event;
      this.findAllProcessesToAllocatePageable();
    } else {
      this.onClearFilter();
    }
  }

  private onClearFilter() : void {
    this.pageRequest.offset = 0;
    this.pageRequest.filter = null;
    this.findAllProcessesToAllocatePageable();
  }

  public processDetails(processId: number) {
    this.router.navigate([`back-office/allocations/single-allocation/${processId}`]);
  }

}
