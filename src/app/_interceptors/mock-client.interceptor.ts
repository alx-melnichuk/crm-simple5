import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  API_CLIENTS, QP_CLIENTS_IDS, QP_CLIENTS_IS_REAL_CLIENT, QP_CLIENTS_HAS_CONTRACT, QP_CLIENTS_EMAILS,
  API_CLIENT, QP_CLIENT_ID
} from '../lib-client/_services/client-api.service';

import { MockClientProvider } from './mock-client.provider';

@Injectable()
export class MockClientInterceptor implements HttpInterceptor {

  private clientProvider: MockClientProvider = new MockClientProvider();

  constructor() {
    console.log('MockClientInterceptor();');
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiClients = (request.url === API_CLIENTS);
    const isApiClient = (request.url === API_CLIENT);
    if (!isApiClients && !isApiClient) {
      return next.handle(request);
    }
    let response = {};
    let delayTime = 100;
    if (isApiClients) {
      switch (request.method) {
        case 'GET':
          const ids1Text = request.params.get(QP_CLIENTS_IDS);
          const ids1 = (!!ids1Text ? ids1Text.split(',').map(item => Number(item)) : null);
          const emailsText = request.params.get(QP_CLIENTS_EMAILS);
          const emails = (!!emailsText ? emailsText.split(',') : null);
          const hasContractText = request.params.get(QP_CLIENTS_HAS_CONTRACT);
          const hasContract = (hasContractText != null ? hasContractText === 'true' : null);
          const isRealClientText = request.params.get(QP_CLIENTS_IS_REAL_CLIENT);
          const isRealClient = (isRealClientText != null ? isRealClientText === 'true' : null);
          response = this.clientProvider.getDtoList({ ids: ids1, emails, hasContract, isRealClient });
          delayTime = 500;
          break;
        case 'DELETE':
          const ids2Text = request.params.get('ids');
          const ids2 = (!!ids2Text ? ids2Text.split(',').map(item => Number(item)) : null);
          response = this.clientProvider.delete({ ids: ids2 });
          delayTime = 200;
          break;
        default:
          break;
      }
    } else if (isApiClient) {
      switch (request.method) {
        case 'GET':
          const id1Text = request.params.get(QP_CLIENT_ID);
          const id1 = Number(id1Text);
          response = this.clientProvider.getDto(id1);
          delayTime = 300;
          break;
        default:
          break;
      }
    }
    return of(new HttpResponse({ status: 200, body: response })).pipe(delay(delayTime));
  }
}

