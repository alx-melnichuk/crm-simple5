import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { MockClientInterceptor } from './_interceptors/mock-client.interceptor';
import { MockTaskInterceptor } from './_interceptors/mock-task.interceptor';

const provideMock = [
  { provide: HTTP_INTERCEPTORS, useClass: MockClientInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockTaskInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule /*(1)*/,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule
  ],
  providers: [
    ...(!environment.production ? provideMock : []),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* (1)
 https://angular.io/api/common/http/HttpInterceptor#usage-notes
 To use the same instance of HttpInterceptors for the entire app, import the HttpClientModule only in your AppModule, and add the
 interceptors to the root application injector. If you import HttpClientModule multiple times across different modules (for example, in lazy
 loading modules), each import creates a new copy of the HttpClientModule, which overwrites the interceptors provided in the root module.
*/
