import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'app/modules/login/login.component';

import { AuthLayoutRouting } from './auth-layout-routing';
import { AuthLayoutComponent } from './auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoverComponent } from 'app/modules/password-recover/password-recover.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    PasswordRecoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRouting),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
