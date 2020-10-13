import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CViewInfoModule } from '../c-view-info/c-view-info.module';
import { CViewTaskListModule } from '../c-view-task-list/c-view-task-list.module';

import { ClientViewRoutingModule } from './client-view-routing.module';
import { ClientViewComponent } from './client-view.component';

@NgModule({
  declarations: [ClientViewComponent],
  imports: [
    CommonModule,
    ClientViewRoutingModule,
    CViewInfoModule,
    CViewTaskListModule
  ]
})
export class ClientViewModule { }
