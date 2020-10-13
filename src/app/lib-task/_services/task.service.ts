import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

import { MD_NAME, MD_COLOR } from '../_consts/lib-task.consts';
import { TaskDto } from '../_interfaces/task-dto.interface';

import { TaskApiService } from './task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public isLoadingData: boolean;
  public clientList: TaskDto[];

  private unsubClientList: Subscription;

  constructor(
    private clientApiService: TaskApiService
  ) {
    console.log(MD_NAME + 'TaskService();', MD_COLOR);
  }

  // ** Public API **

  public getDtoList(data: { ids?: number[], clientId?: number }): Observable<TaskDto[]> {
    return this.clientApiService.getDataList({ ids: (data.ids || []), clientId: data.clientId });
  }

  public getDto(id: number): Observable<TaskDto> {
    return this.clientApiService.getData(id);
  }

  public loadDtoList(data: { ids?: number[] }): void {
    if (this.unsubClientList != null) {
      this.unsubClientList.unsubscribe();
    }
    this.isLoadingData = true;
    const ids = (data.ids || []);
    this.unsubClientList = this.clientApiService.getDataList({ ids })
      .pipe(
        catchError(error => of([])),
        finalize(() => this.isLoadingData = false)
      )
      .subscribe((response: TaskDto[]) => {
        this.clientList = (response || []);
      });
  }
}
