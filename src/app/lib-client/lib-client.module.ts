import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MD_NAME, MD_COLOR } from './_consts/lib-client.consts';
import { ClientApiService } from './_services/client-api.service';
import { ClientService } from './_services/client.service';

export const CLIENT_API_SERVICE_FACTORY =
  (parentService: ClientApiService, http: HttpClient): ClientApiService => {
    return parentService || new ClientApiService(http);
  };

export const CLIENT_SERVICE_FACTORY =
  (parentService: ClientService, clientApiService: ClientApiService): ClientService => {
    return parentService || new ClientService(clientApiService);
  };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: ClientApiService,
      deps: [[new Optional(), new SkipSelf(), ClientApiService], HttpClient],
      useFactory: CLIENT_API_SERVICE_FACTORY
    },
    {
      provide: ClientService,
      deps: [[new Optional(), new SkipSelf(), ClientService], ClientApiService],
      useFactory: CLIENT_SERVICE_FACTORY
    }
  ]
})
export class LibClientModule {
  constructor() {
    console.log(MD_NAME + 'LibClientModule();', MD_COLOR);
  }
}
