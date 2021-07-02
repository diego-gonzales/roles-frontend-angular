import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { ManageCategoryComponent } from './pages/manage-category/manage-category.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesListComponent,
    ManageCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    MaterialModule,
    SharedModule // usado para que funcione el confirmDialogComponent
  ]
})
export class CategoriesModule { }
