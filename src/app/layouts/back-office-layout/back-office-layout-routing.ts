import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeHomeComponent } from './back-office-home/back-office-home.component';
import { ProcessComponent } from 'app/modules/process/process.component';
import { ProcessListComponent } from 'app/modules/process/process-list/process-list.component';

export const BackOfficeLayoutRouting: Routes = [
  {
    path: '',
    component: BackOfficeHomeComponent
  },
  {
    path: 'process',
    component: ProcessComponent,
    children: [
      {
        path: 'list',
        component: ProcessListComponent
      }
    ]
  }
]
