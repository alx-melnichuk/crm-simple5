import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RB_TASK_ID_INFO } from '../_consts/lm-task.consts';
import { TViewInfoComponent } from '../t-view-info/t-view-info.component';

import { TaskViewComponent } from './task-view.component';

const itemRoutes: Routes = [
  {
    path: RB_TASK_ID_INFO,
    component: TViewInfoComponent,
  },
  {
    path: '**',
    redirectTo: RB_TASK_ID_INFO
  }
];

const routes: Routes = [{ path: '', component: TaskViewComponent, children: itemRoutes }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskViewRoutingModule { }
