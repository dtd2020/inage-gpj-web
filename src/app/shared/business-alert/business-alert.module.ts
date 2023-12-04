import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessAlertComponent } from './business-alert.component';
import { PipeModule } from 'app/pipes/pipe.module';



@NgModule({
  declarations: [
    BusinessAlertComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [
    BusinessAlertComponent
  ]
})
export class BusinessAlertModule { }
