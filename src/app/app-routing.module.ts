import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lm-client',
    loadChildren: () => import('./lm-client/lm-client.module').then(m => m.LmClientModule)
  },
  {
    path: 'lm-task',
    loadChildren: () => import('./lm-task/lm-task.module').then(m => m.LmTaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
