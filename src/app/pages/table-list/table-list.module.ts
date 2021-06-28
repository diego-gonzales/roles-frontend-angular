import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableListRoutingModule } from './table-list-routing.module';
import { TableListComponent } from './table-list.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    TableListComponent
  ],
  imports: [
    CommonModule,
    TableListRoutingModule,
    MaterialModule
  ]
})
export class TableListModule { }
