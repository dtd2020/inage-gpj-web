import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg.component';



@NgModule({
  declarations: [ErrorMsgComponent],
  imports: [
    CommonModule
  ],
  exports: [ErrorMsgComponent]
})
export class ErrorMsgModule { }
