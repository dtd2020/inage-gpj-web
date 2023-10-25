import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';
import { AttachmentFormComponent } from './attachment-form/attachment-form.component';



@NgModule({
  declarations: [
    AttachmentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMsgModule
  ],
  exports: [
    AttachmentFormComponent
  ]
})
export class AttachmentModule { }
