import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class BusinessAlertComponent implements OnInit, OnChanges{

  private loggedUser : LocalUserModel;
  

  @Input() alerts: BusinessAlertModel[];
  @Output() alertRemoved: EventEmitter<BusinessAlertModel> = new EventEmitter<BusinessAlertModel>();




constructor(private router: Router, private securityService: SecurityService, private routeService: RouteService, private businessAlertService: BusinessAlertService) { }
  
  

  ngOnInit(): void {
    this.securityService.localUser; 
  }

  ngOnChanges(changes: SimpleChanges): void {

    setTimeout(() => {      
      this.cleanAlerts();
            
    }, 10 * 1000)
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
        let segmentRoute = alert?.link;
        this.router.navigate([segmentRoute], { queryParams: { alertId: alert?.id }});
      }
    } else if(this.routeService.getCurrentUrl().includes('citezen')) {
      // ERRADO, aqui estou passando o id da alocacao e nao do processo
      if(alert?.nextStep.toLocaleLowerCase() === AlertNextStepEnum.FOLLOW_UP_ALLOCATION.key.toLocaleLowerCase()) {
        let segmentRoute = alert?.link;
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


    setTimeout(() => {
      console.log("Waited For: " + this.alerts.length/1000 + " seconds");

      if(this.alerts.length > 0) {
        this.alerts.shift();  
        this.cleanAlerts();      
      }
      
    }, (this.alerts.length) * 1000)

    
  }

  ngOnDestroy(): void {
    
  }



  



}
