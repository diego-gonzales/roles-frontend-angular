import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers.component';


@NgModule({
  declarations: [
    CustomersListComponent, 
    ManageCustomersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CustomersModule { }
