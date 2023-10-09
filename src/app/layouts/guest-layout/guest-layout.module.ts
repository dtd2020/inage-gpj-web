import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLayoutRouting } from './guest-layout-routing';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './guest-layout.component';
import { GuestHomeComponent } from '../guest-home/guest-home.component';


@NgModule({
  declarations: [
    GuestLayoutComponent,
    GuestHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRouting)
  ]
})
export class GuestLayoutModule { }
