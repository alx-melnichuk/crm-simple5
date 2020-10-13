import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RB_LIST, RB_VIEW } from './_consts/lm-client.consts';

const routes: Routes = [
  {
    path: RB_LIST,
    loadChildren: () => import('./client-list/client-list.module').then(m => m.ClientListModule)
  },
  {
    path: RB_VIEW,
    loadChildren: () => import('./client-view/client-view.module').then(m => m.ClientViewModule)
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
export class LmClientRoutingModule { }
