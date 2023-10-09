import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestHomeComponent } from '../guest-home/guest-home.component';

export const GuestLayoutRouting: Routes = [
  {
    path: '',
    component: GuestHomeComponent
  }
]
