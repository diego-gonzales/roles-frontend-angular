import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product-list',
        component: ListProductsComponent
      },
      {
        path: 'detail-product',
        component: ProductDetailComponent
      },
      {
        path: '**',
        redirectTo: 'product-list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
