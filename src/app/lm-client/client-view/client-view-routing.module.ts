import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RB_CLIENT_ID_INFO, RB_CLIENT_ID_TASK_LIST } from '../_consts/lm-client.consts';
import { CViewInfoComponent } from '../c-view-info/c-view-info.component';
import { CViewTaskListComponent } from '../c-view-task-list/c-view-task-list.component';

import { ClientViewComponent } from './client-view.component';

const itemRoutes: Routes = [
  {
    path: RB_CLIENT_ID_INFO,
    component: CViewInfoComponent,
  },
  {
    path: RB_CLIENT_ID_TASK_LIST,
    component: CViewTaskListComponent
  },
  {
    path: '**',
    redirectTo: RB_CLIENT_ID_INFO
  }
];

const routes: Routes = [{ path: '', component: ClientViewComponent, children: itemRoutes }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientViewRoutingModule { }
