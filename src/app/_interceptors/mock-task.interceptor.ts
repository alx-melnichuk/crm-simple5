import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  API_TASKS, QP_TASKS_IDS, QP_TASKS_CLIENT_ID, QP_TASKS_STATUSES,
  API_TASK, QP_TASK_ID
} from '../lib-task/_services/task-api.service';

import { MockTaskProvider } from './mock-task.provider';


@Injectable()
export class MockTaskInterceptor implements HttpInterceptor {

  private taskProvider: MockTaskProvider = new MockTaskProvider();

  constructor() {
    console.log('MockTaskInterceptor();');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiTasks = (request.url === API_TASKS);
    const isApiTask = (request.url === API_TASK);
    if (!isApiTasks && !isApiTask) {
      return next.handle(request);
    }
    let response = {};
    let delayTime = 100;
    if (isApiTasks) {
      switch (request.method) {
        case 'GET':
          const ids1Text = request.params.get(QP_TASKS_IDS);
          const ids1 = (!!ids1Text ? ids1Text.split(',').map(item => Number(item)) : null);

          const clientIdText = request.params.get(QP_TASKS_CLIENT_ID);
          const clientId = (!!clientIdText ? Number(clientIdText) : null);

          const statusesText = request.params.get(QP_TASKS_STATUSES);
          const statuses = (!!statusesText ? statusesText.split(',') : null);

          response = this.taskProvider.getDtoList({ ids: ids1, clientId, statuses });
          delayTime = 500;
          break;
        case 'DELETE':
          const ids2Text = request.params.get('ids');
          const ids2 = (!!ids2Text ? ids2Text.split(',').map(item => Number(item)) : null);
          response = this.taskProvider.delete({ ids: ids2 });
          delayTime = 200;
          break;
        default:
          break;
      }
    } else if (isApiTask) {
      switch (request.method) {
        case 'GET':
          const id1Text = request.params.get(QP_TASK_ID);
          const id1 = Number(id1Text);
          response = this.taskProvider.getDto(id1);
          delayTime = 300;
          break;
        default:
          break;
      }
    }
    return of(new HttpResponse({ status: 200, body: response })).pipe(delay(delayTime));
  }
}
