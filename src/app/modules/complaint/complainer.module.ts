import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainerFormComponent } from './complainer-form/complainer-form.component';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';



@NgModule({
  declarations: [ComplainerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMsgModule
  ],
  exports: [ComplainerFormComponent]
})
export class ComplainerModule { }
