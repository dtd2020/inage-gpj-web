import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMsgModule } from 'app/shared/error-msg/error-msg.module';

import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, UserListComponent, UserFormComponent, UserDetailsComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ErrorMsgModule],
  exports: [UserListComponent, UserFormComponent, UserDetailsComponent],
})
export class UserModule {}
