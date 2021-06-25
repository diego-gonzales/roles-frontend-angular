import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: 'dashboard',
        loadChildren: () => import('../_modules/dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      { 
        path: 'user-profile',
        loadChildren: () => import('../_modules/user-profile/user-profile.module').then( m => m.UserProfileModule )
      },
      { 
        path: 'table-list',
        loadChildren: () => import('../_modules/table-list/table-list.module').then( m => m.TableListModule )
      },
      { 
        path: 'typography',
        loadChildren: () => import('../_modules/typography/typography.module').then( m => m.TypographyModule )
      },
      { 
        path: 'icons',
        loadChildren: () => import('../_modules/icons/icons.module').then( m => m.IconsModule )      
      },
      { 
        path: 'maps',
        loadChildren: () => import('../_modules/maps/maps.module').then( m => m.MapsModule )    
      },
      { 
        path: 'notifications',
        loadChildren: () => import('../_modules/notifications/notifications.module').then( m => m.NotificationsModule )
      },
      { 
        path: 'upgrade',
        loadChildren: () => import('../_modules/upgrade/upgrade.module').then( m => m.UpgradeModule )
      },
      { 
        path: 'products',
        loadChildren: () => import('../_modules/products/products.module').then( m=> m.ProductsModule )
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
