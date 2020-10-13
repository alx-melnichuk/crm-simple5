import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibClientModule } from '../lib-client/lib-client.module';
import { LibTaskModule } from '../lib-task/lib-task.module';

import { LmClientRoutingModule } from './lm-client-routing.module';
import { LmClientComponent } from './lm-client.component';
import { MD_NAME, MD_COLOR } from './_consts/lm-client.consts';

@NgModule({
  declarations: [LmClientComponent],
  imports: [
    CommonModule,
    LmClientRoutingModule,
    LibClientModule,
    LibTaskModule
  ]
})
export class LmClientModule {
  constructor() {
    console.log(MD_NAME + 'LmClientModule();', MD_COLOR);
  }
}
