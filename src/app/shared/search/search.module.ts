import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ErrorMsgModule } from '../error-msg/error-msg.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMsgModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
