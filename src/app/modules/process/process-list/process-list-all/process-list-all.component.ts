import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';

@Component({
  selector: 'process-list-all',
  templateUrl: './process-list-all.component.html',
  styleUrls: ['./process-list-all.component.scss']
})
export class ProcessListAllComponent extends GenericComponent implements OnInit {

  public processes: ProcessModel[] = [];

  constructor(private processService: ProcessService, private router: Router) {
    super();
  }

  ngOnInit(): void {
   this.fetchAllProcesses();
  }


  public fetchAllProcesses() {
    this.processService.fetchAllProcesses().subscribe(
      (processes) => {
        this.processes = processes;
      }
    )    
  }

  public processDetails(processId: number) {
    this.router.navigate([`back-office/processes/details/${processId}`]);
  }

}

