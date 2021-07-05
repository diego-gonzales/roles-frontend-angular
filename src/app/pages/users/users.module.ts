import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';

import { UsersListComponent } from './pages/users-list/users-list.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    UsersListComponent,
    ManageUsersComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsersModule { }
