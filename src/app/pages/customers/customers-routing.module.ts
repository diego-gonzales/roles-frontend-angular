import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CustomersListComponent
      },
      {
        path: 'create',
        component: ManageCustomersComponent
      },
      {
        path: 'update/:id',
        component: ManageCustomersComponent
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
export class CustomersRoutingModule { }
