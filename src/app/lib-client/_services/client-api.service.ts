import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MD_NAME, MD_COLOR, HOST_API } from '../_consts/lib-client.consts';
import { ClientDto } from '../_interfaces/client-dto.interface';

export const API_CLIENTS = HOST_API + '/clients';
export const QP_CLIENTS_IDS = 'ids';
export const QP_CLIENTS_EMAILS = 'emails';
export const QP_CLIENTS_HAS_CONTRACT = 'hasContract';
export const QP_CLIENTS_IS_REAL_CLIENT = 'isRealClient';

export const API_CLIENT = HOST_API + '/client';
export const QP_CLIENT_ID = 'id';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(
    private http: HttpClient
  ) {
    console.log(MD_NAME + 'ClientApiService();', MD_COLOR);
  }

  public getDataList(data: { ids?: number[], emails?: string[], hasContract?: boolean, isRealClient?: boolean }): Observable<ClientDto[]> {
    let params: HttpParams = new HttpParams();
    if (data != null) {
      if (Array.isArray(data.ids) && data.ids.length > 0) {
        params = params.append(QP_CLIENTS_IDS, String(data.ids));
      }
      if (Array.isArray(data.emails) && data.emails.length > 0) {
        params = params.append(QP_CLIENTS_EMAILS, String(data.emails));
      }
      if (data.hasContract != null) {
        params = params.append(QP_CLIENTS_HAS_CONTRACT, String(data.hasContract));
      }
      if (data.isRealClient != null) {
        params = params.append(QP_CLIENTS_IS_REAL_CLIENT, String(data.isRealClient));
      }
    }
    return this.http.get<ClientDto[]>(API_CLIENTS, { params });
  }

  public getData(id: number): Observable<ClientDto> {
    if (id != null) {
      let params: HttpParams = new HttpParams();
      params = params.append(QP_CLIENT_ID, String(id));
      return this.http.get<ClientDto>(API_CLIENT, { params });
    } else {
      console.error('Mandatory "ID" parameter not specified.');
      return of(null);
    }
  }

  public deleteData(ids: number[]): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('ids', String(ids || []));
    return this.http.delete(API_CLIENTS, { params });
  }
}
