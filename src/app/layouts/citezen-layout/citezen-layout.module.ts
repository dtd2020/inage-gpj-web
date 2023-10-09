import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CitezenLayoutRouting } from './citezen-layout-routing';
import { RouterModule } from '@angular/router';
import { CitezenNavbarComponent } from './citezen-navbar/citezen-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessModule } from 'app/modules/process/process.module';
import { CitezenSidebarComponent } from './citezen-sidebar/citezen-sidebar.component';
import { CitezenLayoutComponent } from './citezen-layout.component';
import { CitezenHomeComponent } from './citezen-home/citezen-home.component';


@NgModule({
  declarations: [
    CitezenLayoutComponent,
    CitezenNavbarComponent,
    CitezenSidebarComponent,
    CitezenHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CitezenLayoutRouting),
    ProcessModule
  ],
  exports: [
  ]
})
export class CitezenLayoutModule { }
