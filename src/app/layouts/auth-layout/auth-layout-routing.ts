import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from 'app/modules/login/login.component';
import { PasswordRecoverComponent } from 'app/modules/password-recover/password-recover.component';

export const AuthLayoutRouting: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "password-recover",
    component: PasswordRecoverComponent
  }
]
