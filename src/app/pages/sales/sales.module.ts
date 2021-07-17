import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SalesRoutingModule } from './sales-rounting.module';
import { MaterialModule } from '../material/material.module';

import { SaleListComponent } from './pages/sale-list/sale-list.component';
import { ManageSalesComponent } from './pages/manage-sales/manage-sales.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';

import { DialogService } from '../../shared/services/dialog.service';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    SaleListComponent,
    ManageSalesComponent,
    SaleDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    DialogService // para que funcione tienes que importar el servicio en los providers del modulo en el que se usará
  ]
})
export class SalesModule { }
