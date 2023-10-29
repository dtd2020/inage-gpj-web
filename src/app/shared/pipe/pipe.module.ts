import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationClosedPipe } from 'app/pipes/allocation-closed.pipe';
import { ClosureStatusPipe } from 'app/pipes/closure-status.pipe';



@NgModule({
  declarations: [
    AllocationClosedPipe,
    ClosureStatusPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AllocationClosedPipe,
    ClosureStatusPipe,
  ]
})
export class PipeModule { }
