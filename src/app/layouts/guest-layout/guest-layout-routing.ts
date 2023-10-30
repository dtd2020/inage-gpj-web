
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestHomeComponent } from '../guest-home/guest-home.component';
import { SelfRegisterComponent } from 'app/modules/self-register/self-register.component';
import { ComplainerFormComponent } from 'app/modules/complainer/complainer-form/complainer-form.component';
import { GuestComplainerLayoutComponent } from './guest-complainer-layout/guest-complainer-layout.component';
import { ComplainerComponent } from 'app/modules/complainer/complainer.component';

export const GuestLayoutRouting: Routes = [
  {
    path: '',
    component: GuestHomeComponent,
  },
  {
    path: 'complainer',
    component: GuestComplainerLayoutComponent,
    children: [
      {
        path: 'user-self-register',
        component: SelfRegisterComponent
      },
      {
        path: 'create-edit',
        component: ComplainerFormComponent
      }
    ]
  },
  // {
  //   path: 'self-register',
  //   component: SelfRegisterComponent,
  // },
  // {
  //   path: 'self-register/complainer-create-edit',
  //   component: ComplainerFormComponent,
  // }
]
