import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent
      },
      {
        path: 'create',
        component: ManageProductComponent
      },
      {
        path: 'update/:id',
        component: ManageProductComponent
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
export class ProductsRoutingModule { }
