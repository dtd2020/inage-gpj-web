import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public loggedUser: LocalUserModel;

  constructor(private router: Router, private processService: ProcessService, private securityService: SecurityService) {
    super();
  }

  ngOnInit(): void {
    this.loggedUser = this.securityService.localUser;
    if(!isEmpty(this.loggedUser)) {
      this.fetchAllComplainerProcessesByUserId(this.loggedUser?.id);
    }
  }


  public fetchAllComplainerProcessesByUserId(userId: number) {
    this.processService.fetchAllComplainerProcessesByUserId(userId).subscribe(
      (processes) => {
        this.processes = processes;
      }
    )    
  }

  public createProcess(userId: number): void {
    console.log(userId);
    console.log(this.loggedUser);
    
    
    this.router.navigate(['/citezen/processes/create-edit'], { queryParams: { userId: userId}});
  }

  public processDetails(processId: number) {
    this.router.navigate([`citezen/processes/details/${processId}`]);
  }

}
