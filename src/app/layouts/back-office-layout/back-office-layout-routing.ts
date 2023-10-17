import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeHomeComponent } from './back-office-home/back-office-home.component';
import { ProcessComponent } from 'app/modules/process/process.component';
import { ProcessListComponent } from 'app/modules/process/process-list/process-list.component';
import { UserComponent } from 'app/modules/user/user.component';
import { UserListComponent } from 'app/modules/user/user-list/user-list.component';
import { UserFormComponent } from 'app/modules/user/user-form/user-form.component';
import { UserDetailsComponent } from 'app/modules/user/user-details/user-details.component';

export const BackOfficeLayoutRouting: Routes = [
  {
    path: '',
    // component: BackOfficeHomeComponent,
    redirectTo: "users/list",
    pathMatch: "full",
  },
  {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'details/:id',
        component: UserDetailsComponent
      },
      {
        path: 'create-edit',
        component: UserFormComponent
      }
    ]
  },
  {
    path: 'processes',
    component: ProcessComponent,
    children: [
      {
        path: 'list',
        component: ProcessListComponent
      }
    ]
  }
]
