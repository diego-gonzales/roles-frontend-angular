import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpgradeRoutingModule } from './upgrade-routing.module';
import { UpgradeComponent } from './upgrade.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    UpgradeComponent
  ],
  imports: [
    CommonModule,
    UpgradeRoutingModule,
    MaterialModule
  ]
})
export class UpgradeModule { }
