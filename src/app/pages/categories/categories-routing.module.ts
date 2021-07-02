import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { ManageCategoryComponent } from './pages/manage-category/manage-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CategoriesListComponent
      },
      {
        path: 'create',
        component: ManageCategoryComponent
      },
      {
        path: 'update/:id',
        component: ManageCategoryComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
