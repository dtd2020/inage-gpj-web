import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessAlertModel } from 'app/models/business-alert-model';
import { AlertNextStepEnum } from 'app/models/enums/alert-next-step-enum';
import { AlertTakenActionEnum } from 'app/models/enums/alert-taken-action-enum';
import { LocalUserModel } from 'app/security/models/local-user';
import { SecurityService } from 'app/security/services/security.service';
import { BusinessAlertService } from 'app/services/business-alert.service';
import { isEmpty } from '../utils/utils';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'business-alert',
  templateUrl: './business-alert.component.html',
  styleUrls: ['./business-alert.component.scss']
})
export class BusinessAlertComponent implements OnInit{

  private loggedUser : LocalUserModel;
  // private showAlert: boolean = true;
  private alertTimer: any;
  private length = [1,2,3,4];

  @Input() alerts: BusinessAlertModel[];
  @Output() alertRemoved: EventEmitter<BusinessAlertModel> = new EventEmitter<BusinessAlertModel>();



constructor(private router: Router, private securityService: SecurityService, private routeService: RouteService, private businessAlertService: BusinessAlertService) { }
  

  ngOnInit(): void {
    this.securityService.localUser; 

    setTimeout(() => {      
      this.cleanAlerts();
    }, 5 * 1000)

  }

  private markAsRead(alertId: number) {
    this.businessAlertService.markAsRead(alertId).subscribe(
      (data) => {
        this.removeAlert(data)
      }
    )  
    
  }

  private goTo(alert: BusinessAlertModel) {

    this.removeAlert(alert);
    
    if(this.routeService.getCurrentUrl().includes('back-office')) {
      if(alert?.nextStep.toLocaleLowerCase() === AlertNextStepEnum.FOLLOW_UP_ALLOCATION.key.toLocaleLowerCase()) {
        let segmentRoute = `${AlertNextStepEnum.FOLLOW_UP_ALLOCATION.backOfficeRoute}/${alert?.contextEntityId}`;
        this.router.navigate([segmentRoute], { queryParams: { alertId: alert?.id }});
      }
    } else if(this.routeService.getCurrentUrl().includes('citezen')) {
      if(alert?.nextStep.toLocaleLowerCase() === AlertNextStepEnum.FOLLOW_UP_ALLOCATION.key.toLocaleLowerCase()) {
        let segmentRoute = `${AlertNextStepEnum.FOLLOW_UP_ALLOCATION.complainerRoute}/${alert?.contextEntityId}`;
        this.router.navigate([segmentRoute], { queryParams: { alertId: alert?.id }});
      }
    } else {
      throw Error('Nao implementado')
    }
  }

  private removeAlert(alert: BusinessAlertModel) {
    this.alerts = this.alerts.filter(thiAlert => thiAlert?.id !== alert?.id);
  }

  private cleanAlerts() {

    this.alertTimer = setInterval(() => {
      if(this.alerts.length > 0) {
        this.alerts.shift();
      }
    }, 3 * 1000);
    // this.showAlert = false; 
    // this.alertRemoved.emit(alert); 
  }

  ngOnDestroy(): void {
    clearInterval(this.alertTimer);
    
  }




}
