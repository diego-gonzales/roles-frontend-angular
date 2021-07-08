import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SaleListComponent } from "./pages/sale-list/sale-list.component";
import { ManageSalesComponent } from './pages/manage-sales/manage-sales.component';
import { SaleDetailComponent } from './pages/sale-detail/sale-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SaleListComponent,
      },
      {
        path: 'detail/:id',
        component: SaleDetailComponent
      },
      {
        path: 'create',
        component: ManageSalesComponent
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
