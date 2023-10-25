import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';

@Component({
  selector: 'process-list-allocated',
  templateUrl: './process-list-allocated.component.html',
  styleUrls: ['./process-list-allocated.component.scss']
})
export class ProcessListAllocatedComponent extends GenericComponent implements OnInit{

  public processes: ProcessModel[] = [];

  constructor(private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {
   this.fetchAllAllocatedProcesses();
  }


  public fetchAllAllocatedProcesses() {
    this.processService.fetchAllAllocatedProcesses().subscribe(
      (processes) => {
        this.processes = processes;
      }
    )
    
  }

}
