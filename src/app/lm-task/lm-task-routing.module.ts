import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RB_LIST, RB_VIEW } from './_consts/lm-task.consts';

const routes: Routes = [
  {
    path: RB_LIST,
    loadChildren: () => import('./task-list/task-list.module').then(m => m.TaskListModule)
  },
  {
    path: RB_VIEW,
    loadChildren: () => import('./task-view/task-view.module').then(m => m.TaskViewModule)
  },
  {
    path: '**',
    redirectTo: RB_LIST
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LmTaskRoutingModule { }
