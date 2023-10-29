import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';
import { RouterModule } from '@angular/router';
import { SatffListComponent } from './satff-list/satff-list.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';



@NgModule({
  declarations: [
    StaffComponent,
    StaffFormComponent,
    SatffListComponent,
    StaffDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMsgModule
  ],
  exports: [StaffComponent,
    StaffFormComponent,
    SatffListComponent,
    StaffDetailsComponent,]
})
export class StaffModule { }
