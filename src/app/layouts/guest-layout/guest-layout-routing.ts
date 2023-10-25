import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestHomeComponent } from '../guest-home/guest-home.component';
import { SelfRegisterComponent } from 'app/modules/self-register/self-register.component';

export const GuestLayoutRouting: Routes = [
  {
    path: '',
    component: GuestHomeComponent,
  },
  {
    path: 'self-register',
    component: SelfRegisterComponent,
  }
]
