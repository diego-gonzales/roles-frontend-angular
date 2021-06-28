import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsRoutingModule } from './icons-routing.module';
import { IconsComponent } from './icons.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    IconsComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule,
    MaterialModule
  ]
})
export class IconsModule { }
