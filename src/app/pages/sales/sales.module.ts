import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-rounting.module';
import { MaterialModule } from '../material/material.module';

import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { ManageSalesComponent } from './pages/manage-sales/manage-sales.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';



@NgModule({
  declarations: [
    SaleListComponent,
    ManageSalesComponent,
    SaleDetailComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule
  ]
})
export class SalesModule { }
