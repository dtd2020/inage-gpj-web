import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllocationClosedPipe } from 'app/pipes/allocation-closed.pipe';
import { ClosureStatusPipe } from 'app/pipes/closure-status.pipe';
import { ProcessStatusPipe } from './process-status.pipe';
import { ComplainerTypePipe } from './complainer-type.pipe';
import { ProcessTypePipe } from './process-type.pipe';



@NgModule({
  declarations: [
    AllocationClosedPipe,
    ClosureStatusPipe,
    ProcessStatusPipe,
    ComplainerTypePipe,
    ProcessTypePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AllocationClosedPipe,
    ClosureStatusPipe,
    ProcessStatusPipe,
    ProcessTypePipe,
    ComplainerTypePipe
  ]
})
export class PipeModule { }
