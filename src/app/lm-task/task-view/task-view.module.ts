import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TViewInfoModule } from '../t-view-info/t-view-info.module';

import { TaskViewRoutingModule } from './task-view-routing.module';
import { TaskViewComponent } from './task-view.component';


@NgModule({
  declarations: [TaskViewComponent],
  imports: [
    CommonModule,
    TaskViewRoutingModule,
    TViewInfoModule
  ]
})
export class TaskViewModule { }
