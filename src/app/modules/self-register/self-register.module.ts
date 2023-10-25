import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfRegisterComponent } from './self-register.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';



@NgModule({
  declarations: [
    SelfRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMsgModule,
    UserModule
  ]
})
export class SelfRegisterModule { }
