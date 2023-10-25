import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchAllocationFormComponent } from './batch-allocation-form/batch-allocation-form.component';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';
import { AllocationComponent } from './allocation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BatchAllocationFormComponent,
    AllocationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMsgModule
  ],
  exports: [
    BatchAllocationFormComponent
  ]
})
export class AllocationModule { }
