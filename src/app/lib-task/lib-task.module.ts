import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MD_NAME, MD_COLOR } from './_consts/lib-task.consts';
import { TaskApiService } from './_services/task-api.service';
import { TaskService } from './_services/task.service';

export const TASK_API_SERVICE_FACTORY =
  (parentService: TaskApiService, http: HttpClient): TaskApiService => {
    return parentService || new TaskApiService(http);
  };

export const TASK_SERVICE_FACTORY =
  (parentService: TaskService, taskApiService: TaskApiService): TaskService => {
    return parentService || new TaskService(taskApiService);
  };

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: TaskApiService,
      deps: [[new Optional(), new SkipSelf(), TaskApiService], HttpClient],
      useFactory: TASK_API_SERVICE_FACTORY
    },
    {
      provide: TaskService,
      deps: [[new Optional(), new SkipSelf(), TaskService], TaskApiService],
      useFactory: TASK_SERVICE_FACTORY
    }
  ]
})
export class LibTaskModule {
  constructor() {
    console.log(MD_NAME + 'LibTaskModule();', MD_COLOR);
  }
}
