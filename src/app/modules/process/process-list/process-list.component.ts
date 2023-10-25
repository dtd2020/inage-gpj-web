import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessModel } from 'app/models/process-model';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { SwalManagementService } from 'app/shared/swal-management.service';

@Component({
  selector: 'process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent extends GenericComponent implements OnInit {

  public processes: ProcessModel[] = [];

  public citezenSection: boolean = false;
  public staffSection: boolean = false;
  public canShowComplainerProcesses: boolean = false;
  public canShowAllProcesses: boolean = false;
  public canShowAllAlailableToAllocate: boolean = false;
  public canShowAllAAllocated: boolean = false;
  
  constructor(private processService: ProcessService, private route: ActivatedRoute, private router: Router, private swalManagService: SwalManagementService) {
    super();
  }

 



  ngOnInit(): void {
    this.citezenSection = this.router.url.includes('citezen');
    this.canShowComplainerProcesses =  this.router.url.includes('citezen');
    this.staffSection = this.router.url.includes('back-office');
    this.canShowAllProcesses = this.router.url.includes('back-office');
    
  }

  public fetchComplainerProcesses() {
    this.canShowComplainerProcesses = true;
    this.canShowAllProcesses = false;
    this.canShowAllAlailableToAllocate = false;
    this.canShowAllAAllocated = false;
    
  }

  public fetchAllProcesses() {
   this.canShowComplainerProcesses = false;
   this.canShowAllProcesses = true;
   this.canShowAllAlailableToAllocate = false;
   this.canShowAllAAllocated = false;
    
  }

  public findAllProcessesToAllocate() {
    this.canShowComplainerProcesses = false;
    this.canShowAllProcesses = false;
   this.canShowAllAlailableToAllocate = true;
   this.canShowAllAAllocated = false;
  }

  public fetchAllAllocatedProcesses() {
    this.canShowComplainerProcesses = false;
    this.canShowAllProcesses = false;
    this.canShowAllAlailableToAllocate = false;
    this.canShowAllAAllocated = true;
  }

  public createProcess() {
    if(this.router.url.includes('citezen')) {
      this.router.navigate['citezen/processes/create-edit']
    } else {
      this.swalManagService.sweetAlterError("Funcionalidade indisponível.");
    }

  }

  get getRouter() {
    return this.router;
  }

}
