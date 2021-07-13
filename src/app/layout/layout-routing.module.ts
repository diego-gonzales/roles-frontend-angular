import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      {
        path: 'products',
        loadChildren: () => import('../pages/products/products.module').then( m => m.ProductsModule ),
        // canActivate: [AuthGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('../pages/categories/categories.module').then( m => m.CategoriesModule )
      },
      {
        path: 'users',
        loadChildren: () => import('../pages/users/users.module').then( m => m.UsersModule )
      },
      {
        path: 'customers',
        loadChildren: () => import('../pages/customers/customers.module').then( m => m.CustomersModule )
      },
      {
        path: 'sales',
        loadChildren: () => import('../pages/sales/sales.module').then( m => m.SalesModule ),
        // canActivate: [AuthGuard]
      },
      { 
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/user-profile.module').then( m => m.UserProfileModule )
      },
      { 
        path: 'table-list',
        loadChildren: () => import('../pages/table-list/table-list.module').then( m => m.TableListModule )
      },
      { 
        path: 'typography',
        loadChildren: () => import('../pages/typography/typography.module').then( m => m.TypographyModule )
      },
      { 
        path: 'icons',
        loadChildren: () => import('../pages/icons/icons.module').then( m => m.IconsModule )      
      },
      { 
        path: 'maps',
        loadChildren: () => import('../pages/maps/maps.module').then( m => m.MapsModule )    
      },
      { 
        path: 'notifications',
        loadChildren: () => import('../pages/notifications/notifications.module').then( m => m.NotificationsModule )
      },
      { 
        path: 'upgrade',
        loadChildren: () => import('../pages/upgrade/upgrade.module').then( m => m.UpgradeModule )
      },
      { 
        path: '**',
        redirectTo: 'dashboard'
      }
    ],
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
