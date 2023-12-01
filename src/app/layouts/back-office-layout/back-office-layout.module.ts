import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProcessModule } from 'app/modules/process/process.module';
import { UserModule } from 'app/modules/user/user.module';

import { BackOfficeLayoutRouting } from './back-office-layout-routing';
import { BackOfficeLayoutComponent } from './back-office-layout.component';
import { BackOfficeNavbarComponent } from './back-office-navbar/back-office-navbar.component';
import { BackOfficeSidebarComponent } from './back-office-sidebar/back-office-sidebar.component';
import { AllocationModule } from 'app/modules/allocation/allocation.module';
import { StaffModule } from 'app/modules/staff/staff.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BusinessAlertModule } from 'app/shared/business-alert/business-alert.module';


@NgModule({
  declarations: [
    BackOfficeLayoutComponent,
    BackOfficeNavbarComponent,
    BackOfficeSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BackOfficeLayoutRouting),
    FormsModule,
    ReactiveFormsModule,
    ProcessModule,
    AllocationModule,
    UserModule,
    StaffModule,
    BusinessAlertModule,
  ]
})
export class BackOfficeLayoutModule { }
