import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { THeaderModule } from '../t-header/t-header.module';
import { TaskGridModule } from '../../lib-task/task-grid/task-grid.module';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';

@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    THeaderModule,
    TaskGridModule
  ]
})
export class TaskListModule { }
