import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BackOfficeLayoutRouting } from './back-office-layout-routing';
import { BackOfficeNavbarComponent } from './back-office-navbar/back-office-navbar.component';
import { BackOfficeSidebarComponent } from './back-office-sidebar/back-office-sidebar.component';
import { BackOfficeLayoutComponent } from './back-office-layout.component';
import { ProcessModule } from 'app/modules/process/process.module';


@NgModule({
  declarations: [
    BackOfficeLayoutComponent,
    BackOfficeNavbarComponent,
    BackOfficeSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BackOfficeLayoutRouting),
    ProcessModule
  ]
})
export class BackOfficeLayoutModule { }
