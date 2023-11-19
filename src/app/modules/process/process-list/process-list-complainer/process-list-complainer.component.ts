import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessStatusEnum } from 'app/models/enums/process-status-enum';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { ProcessModel } from 'app/models/process-model';
import { UserModel } from 'app/models/user-model';
import { LocalUserModel } from 'app/security/models/local-user';
import { SecurityService } from 'app/security/services/security.service';
import { ProcessService } from 'app/services/process.service';
import { GenericComponent } from 'app/shared/generic/generic.component';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'process-list-complainer',
  templateUrl: './process-list-complainer.component.html',
  styleUrls: ['./process-list-complainer.component.scss']
})
export class ProcessListComplainerComponent extends GenericComponent implements OnInit{

  public processes: ProcessModel[] = [];
  private pageableMeta: PageableMetaModel;
  private pageRequest: PageRequestModel = {
    offset: 0,
    pageSize: 10,
    sortBy: null
  };
  public loggedUser: LocalUserModel;
  private readonly AWAITINIG_COMPLAINER_RESPONSE: string = ProcessStatusEnum.AWAITING_COMPLAINER_RESPONSE.key;

  constructor(private router: Router, private processService: ProcessService, private securityService: SecurityService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;
    if(!isEmpty(this.loggedUser)) {
      this.fetchAllComplainerProcessesByUserIdPageable(this.loggedUser?.id);
    }
  }


  public fetchAllComplainerProcessesByUserIdPageable(userId: number) {
    this.processService.fetchAllComplainerProcessesByUserIdPageable(userId, this.pageRequest).subscribe(
      (processePageable) => {
        this.processes = processePageable.data;
        this.pageableMeta = processePageable.pageableMeta;
      }
    )    
  }

  private onPaginationEvent(event: PageRequestModel): void {
    this.pageRequest = event;
    this.fetchAllComplainerProcessesByUserIdPageable(this.loggedUser?.id);
  }

  public createProcess(userId: number): void { 
    this.router.navigate(['/citezen/processes/create-edit'], { queryParams: { userId: userId}});
  }

  public processDetails(processId: number) {
    this.router.navigate([`citezen/processes/details/${processId}`]);
  }

  private followUpAllocation(processId: number) : void {
    this.router.navigate([`citezen/allocations/follow-up/${processId}`]);
  }

}
