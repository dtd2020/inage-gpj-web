import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMsgModule,
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule { }
