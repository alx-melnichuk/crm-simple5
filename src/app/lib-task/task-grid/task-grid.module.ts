import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TaskGridComponent } from './task-grid.component';

@NgModule({
  declarations: [TaskGridComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [TaskGridComponent]
})
export class TaskGridModule { }
