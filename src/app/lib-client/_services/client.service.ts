import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

import { MD_NAME, MD_COLOR } from '../_consts/lib-client.consts';
import { ClientDto } from '../_interfaces/client-dto.interface';

import { ClientApiService } from './client-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public isLoadingData: boolean;
  public clientList: ClientDto[];

  private unsubClientList: Subscription;

  constructor(
    private clientApiService: ClientApiService
  ) {
    console.log(MD_NAME + 'ClientService();', MD_COLOR);
  }

  // ** Public API **

  public getDtoList(data: { ids?: number[] }): Observable<ClientDto[]> {
    const ids = (data.ids || []);
    return this.clientApiService.getDataList({ ids });
  }

  public getDto(id: number): Observable<ClientDto> {
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
      .subscribe((response: ClientDto[]) => {
        this.clientList = (response || []);
      });
  }
}
