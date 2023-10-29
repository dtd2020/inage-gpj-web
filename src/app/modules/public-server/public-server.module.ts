import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicServerComponent } from './public-server.component';
import { ComplainerModule } from '../complainer/complainer.module';
import { StaffModule } from '../staff/staff.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PublicServerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComplainerModule,
    StaffModule,
  ]
})
export class PublicServerModule { }
