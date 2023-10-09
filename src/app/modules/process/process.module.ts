import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProcessComponent,
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProcessComponent,
    ProcessListComponent
  ]
})
export class ProcessModule { }
