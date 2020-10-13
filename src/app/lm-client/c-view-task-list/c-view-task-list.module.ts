import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHeaderModule } from '../c-header/c-header.module';

import { CViewTaskListComponent } from './c-view-task-list.component';
import { TaskGridModule } from '../../lib-task/task-grid/task-grid.module';

@NgModule({
  declarations: [CViewTaskListComponent],
  imports: [
    CommonModule,
    CHeaderModule,
    TaskGridModule
  ],
  exports: [CViewTaskListComponent]
})
export class CViewTaskListModule { }
