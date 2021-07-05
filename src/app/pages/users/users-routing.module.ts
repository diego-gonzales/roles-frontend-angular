import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UsersListComponent
      },
      {
        path: 'create',
        component: ManageUsersComponent
      },
      {
        path: 'update/:id',
        component: ManageUsersComponent
      },
      {
        path: 'updatePass/:id',
        component: ChangePasswordComponent
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
export class UsersRoutingModule { }
