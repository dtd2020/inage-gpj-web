import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainerFormComponent } from './complainer-form/complainer-form.component';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';
import { ComplainerComponent } from './complainer.component';
import { RouterModule } from '@angular/router';
import { ComplainerListComponent } from './complainer-list/complainer-list.component';
import { ComplainerDetailsComponent } from './complainer-details/complainer-details.component';



@NgModule({
  declarations: [ComplainerFormComponent, ComplainerComponent, ComplainerListComponent, ComplainerDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMsgModule
  ],
  exports: [ComplainerFormComponent, ComplainerComponent, ComplainerListComponent, ComplainerDetailsComponent]
})
export class ComplainerModule { }
