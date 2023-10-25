import { Component, OnInit } from '@angular/core';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';

@Component({
  selector: 'process-list-to-allocate',
  templateUrl: './process-list-to-allocate.component.html',
  styleUrls: ['./process-list-to-allocate.component.scss']
})
export class ProcessListToAllocateComponent extends GenericComponent implements OnInit {

  public processes: ProcessModel[] = [];

  constructor(private processService: ProcessService) {
    super();
  }

  ngOnInit(): void {
   this.findAllProcessesToAllocate();
  }


  public findAllProcessesToAllocate() {
    this.processService.findAllProcessesToAllocate().subscribe(
      (processes) => {
        this.processes = processes;
      }
    )
    
  }

}
