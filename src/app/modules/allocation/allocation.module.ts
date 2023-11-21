import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';

import { AllocationListComponent } from './allocation-list/allocation-list.component';
import { AllocationComponent } from './allocation.component';
import { BatchAllocationFormComponent } from './batch-allocation-form/batch-allocation-form.component';
import { FollowUpAllocationProcessComponent } from './follow-up-allocation-process/follow-up-allocation-process.component';
import { SingleAllocationFormComponent } from './single-allocation-form/single-allocation-form.component';
import { ClosureStatusPipe } from 'app/pipes/closure-status.pipe';
import { AllocationClosedPipe } from 'app/pipes/allocation-closed.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComplainerFollowUpAllocationProcessComponent } from './complainer-follow-up-allocation-process/complainer-follow-up-allocation-process.component';
import { StaffFollowUpAllocationProcessComponent } from './staff-follow-up-allocation-process/staff-follow-up-allocation-process.component';
import { PipeModule } from 'app/pipes/pipe.module';
import { AllocationDetailsComponent } from './allocation-details/allocation-details.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PaginationModule } from 'app/shared/pagination/pagination.module';



@NgModule({
  declarations: [
    BatchAllocationFormComponent,
    AllocationComponent,
    SingleAllocationFormComponent,
    AllocationListComponent,
    FollowUpAllocationProcessComponent,
    ComplainerFollowUpAllocationProcessComponent,
    StaffFollowUpAllocationProcessComponent,
    AllocationDetailsComponent,
    
    // ClosureStatusPipe,
    // AllocationClosedPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    PaginationModule,
   
    ErrorMsgModule,
    PipeModule,
    NgxPermissionsModule.forChild()
    
  ],
  exports: [
    BatchAllocationFormComponent
  ]
})
export class AllocationModule { }
