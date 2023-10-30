import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLayoutRouting } from './guest-layout-routing';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from './guest-layout.component';
import { GuestHomeComponent } from '../guest-home/guest-home.component';
import { SelfRegisterModule } from 'app/modules/self-register/self-register.module';
import { ComplainerModule } from 'app/modules/complainer/complainer.module';
import { GuestComplainerLayoutComponent } from './guest-complainer-layout/guest-complainer-layout.component';


@NgModule({
  declarations: [
    GuestLayoutComponent,
    GuestHomeComponent,
    GuestComplainerLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRouting),
    SelfRegisterModule,
    ComplainerModule
  ]
})
export class GuestLayoutModule { }
