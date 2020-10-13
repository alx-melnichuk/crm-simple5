import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MD_NAME, MD_COLOR, HOST_API } from '../_consts/lib-task.consts';
import { TaskDto } from '../_interfaces/task-dto.interface';

export const API_TASKS = HOST_API + '/tasks';
export const QP_TASKS_IDS = 'ids';
export const QP_TASKS_CLIENT_ID = 'clientId';
export const QP_TASKS_STATUSES = 'statuses';

export const API_TASK = HOST_API + '/task';
export const QP_TASK_ID = 'id';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(
    private http: HttpClient
  ) {
    console.log(MD_NAME + 'TaskApiService();', MD_COLOR);
  }

  public getDataList(data: { ids?: number[], clientId?: number, statuses?: string[] }): Observable<TaskDto[]> {
    let params: HttpParams = new HttpParams();
    if (data != null) {
      if (Array.isArray(data.ids) && data.ids.length > 0) {
        params = params.append(QP_TASKS_IDS, String(data.ids));
      }
      if (data.clientId != null) {
        params = params.append(QP_TASKS_CLIENT_ID, String(data.clientId));
      }
      if (Array.isArray(data.statuses) && data.statuses.length > 0) {
        params = params.append(QP_TASKS_STATUSES, String(data.statuses));
      }
    }
    return this.http.get<TaskDto[]>(API_TASKS, { params });
  }

  public getData(id: number): Observable<TaskDto> {
    if (id != null) {
      let params: HttpParams = new HttpParams();
      params = params.append(QP_TASK_ID, String(id));
      return this.http.get<TaskDto>(API_TASK, { params });
    } else {
      console.error('Mandatory "ID" parameter not specified.');
      return of(null);
    }
  }

  public deleteData(ids: number[]): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ids', String(ids || []));
    return this.http.delete(API_TASKS, { params });
  }
}
