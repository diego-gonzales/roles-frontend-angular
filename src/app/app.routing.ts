import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path: 'pages',
    loadChildren: () => import('./layout/layout.module').then( m => m.LayoutModule )
  },
  {
    path: 'authentication',
    loadChildren: () => import('./pages/authentication/authentication.module').then( m => m.AuthenticationModule )
  },
  {
    path: '**',
    redirectTo: 'authentication',
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes) // se sacó el useHash()
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
