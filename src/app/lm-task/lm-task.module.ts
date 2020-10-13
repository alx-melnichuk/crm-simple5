import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibClientModule } from '../lib-client/lib-client.module';
import { LibTaskModule } from '../lib-task/lib-task.module';

import { LmTaskRoutingModule } from './lm-task-routing.module';
import { LmTaskComponent } from './lm-task.component';
import { MD_NAME, MD_COLOR } from './_consts/lm-task.consts';

@NgModule({
  declarations: [LmTaskComponent],
  imports: [
    CommonModule,
    LmTaskRoutingModule,
    LibClientModule,
    LibTaskModule
  ]
})
export class LmTaskModule {
  constructor() {
    console.log(MD_NAME + 'LmTaskModule();', MD_COLOR);
  }
}
