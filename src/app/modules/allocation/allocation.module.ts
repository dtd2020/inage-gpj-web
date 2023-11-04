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
import { PipeModule } from 'app/shared/pipe/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComplainerFollowUpAllocationProcessComponent } from './complainer-follow-up-allocation-process/complainer-follow-up-allocation-process.component';



@NgModule({
  declarations: [
    BatchAllocationFormComponent,
    AllocationComponent,
    SingleAllocationFormComponent,
    AllocationListComponent,
    FollowUpAllocationProcessComponent,
    ComplainerFollowUpAllocationProcessComponent,
    
    // ClosureStatusPipe,
    // AllocationClosedPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
   
    ErrorMsgModule,
    PipeModule
    
  ],
  exports: [
    BatchAllocationFormComponent
  ]
})
export class AllocationModule { }
