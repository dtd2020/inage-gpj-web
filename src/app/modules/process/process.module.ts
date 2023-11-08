import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { RouterModule } from '@angular/router';
import { ProcessFormComponent } from './process-form/process-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { ProcessDataFormComponent } from './process-form/process-data-form/process-data-form.component';
import { ProcessDetailsComponent } from './process-details/process-details.component';
import { ProcessListAllComponent } from './process-list/process-list-all/process-list-all.component';
import { ProcessListToAllocateComponent } from './process-list/process-list-to-allocate/process-list-to-allocate.component';
import { ProcessListAllocatedComponent } from './process-list/process-list-allocated/process-list-allocated.component';
import { ProcessListComplainerComponent } from './process-list/process-list-complainer/process-list-complainer.component';
import { ComplainerModule } from '../complainer/complainer.module';
import { PipeModule } from 'app/pipes/pipe.module';



@NgModule({
  declarations: [
    ProcessComponent,
    ProcessListComponent,
    ProcessFormComponent,
    ProcessDataFormComponent,
    ProcessDetailsComponent,
    ProcessListAllComponent,
    ProcessListToAllocateComponent,
    ProcessListAllocatedComponent,
    ProcessListComplainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMsgModule,
    PipeModule,
    ComplainerModule,
    AttachmentModule
  ],
  exports: [
    ProcessComponent,
    ProcessListComponent
  ]
})
export class ProcessModule { }
