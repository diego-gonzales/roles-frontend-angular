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
        loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardModule )
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
