import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then( m => m.LayoutModule )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes) // se sacó el useHash()
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
