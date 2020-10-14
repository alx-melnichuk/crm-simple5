> Article in Russian [README_ru.md](https://github.com/alx-melnichuk/crm-simple5/blob/master/README_ru.md)

## _Angular_ application with lazy loadable modules.

### Introduction

The _Angular_ application consists of modules that store components, directives, services, and so on. Over time, new functionality is added to the application and the number of its modules increases. As a result, the total download time increases. Asynchronous routing (lazy load) can be used to reduce application load time. Asynchronous loading allows you to load modules when the user accesses a global menu item (route).

Let's create an application with several functional modules. Each such module will be called domain and it will concentrate functionality for working with a specific entity. These domain modules will be loaded by lazy loading (_lm - loadable modules_).

### Let's create the main application.

Create a directory for the project go to it:

```bash
$ mkdir /home/alexey/ws_ts3/crm-simple5 && cd /home/alexey/ws_ts3/crm-simple5
```

Install locally required version of @angular/cli (Angular 10 version was used):

```bash
$ npm install @angular/cli@10
```

You can install the latest version locally:

```bash
$ npm install @angular/cli@latest
```

As a result, a new subdirectory `node_modules` appears in the current directory, which contains the required version of `@angular/cli`.

Create workspace and main application _crm-simple_:

```bash
$ npx ng new crm-simple --directory=. --routing=true --style=scss
```

- `ng new crm-simple` - create a new application
- `--directory=.` - in the current directory
- `--routing=true` - generate module routing
- `--style=scss` - use preprocessor 'scss'

### Add _Angular Material_ to the project.

The _Angular Material_ library contains many useful components that will help us create a robust and beautiful application. A description of this library can be found on the website [https://material.angular.io/](https://material.angular.io/).

Let's add the _Angular Material_ version 10 library to the project, since _Angular_ version 10 was installed.

```bash
$ npx ng add @angular/material@10
```

We answer all questions by default.

### Let's create a loadable module _lm-client_ for working with clients.

Let's add a domain module for working with clients to our application. This module will be lazy loaded along the _lm-client_ route. This module is an intermediate domain module, so the main domain module must be loaded after it.

```bash
$ npx ng generate module lm-client --routing=true --route=lm-client --module=app-routing.module
```

- `--routing=true` - generate module routing.
- `--route=lm-client` - the name of the route for the lazy load module. Creates a component in a new module and adds a route to that component in the `Routes` specified in the module's `--module` option.
- `--module=app-routing.module` - a module in the `Routes` array which adds a route to a new component.

Let's create a common header for the client list and client properties _c-header_ component.

```###bash
$ npx ng generate module lm-client/c-header
$ npx ng generate component lm-client/c-header --export=true
```

### Let's create a library module _lib-client_ for common entities by clients.

Let's separate the service for clients _client-api_ into a separate library module _lib-client_.

```bash
$ npx ng generate module lib-client
```

Let's create an interface for a data-transport object based on customer data.

```bash
$ npx ng generate interface lib-client/_interface/client-dto interface
```

Let's create a service for interacting with the server according to the client's data.

```bash
$ npx ng generate service lib-client/_services/client-api
```

Let's create a service for working with client data. There will be some business logic in this service.

```bash
$ npx ng generate service lib-client/_services/client
```

While we do not have a BackEnd, we will create an interceptor to simulate server responses. And since the _HttpClientModule_ module has been added to the list of imports in the main _AppModule_ module, the interceptor must be there too.

```bash
$ npx ng generate interceptor _interceptors/mock-client --skipTests=true
```

Let's create a component for displaying a list of customers.

```bash
$ npx ng generate module lib-client/client-grid
$ npx ng generate component lib-client/client-grid --export=true
```

### Let's create a loadable module _client-list_ for the client list.

Let's create a module and a component for displaying a list of customers. This module will be lazy loaded along the '_list_' route.

```bash
$ npx ng generate module lm-client/client-list --route=list --module=lm-client-routing.module
```

### Let's create a loadable module _client-view_ for client properties.

Let's create a module and a component for displaying client properties. This module will be lazy loaded along the '_view /: clientId_' route.

```bash
$ npx ng generate module lm-client/client-view --route=view/:clientId --module=lm-client-routing.module
```

Let's create a module and a _c-view_ component to display tabs with information on this client.

```bash
$ npx ng generate module lm-client/c-view
$ npx ng generate component lm-client/c-view --export=true
```

Let's create a module and a c-view-info component to display information about client properties.

```bash
$ npx ng generate module lm-client/c-view-info
$ npx ng generate component lm-client/c-view-info --export=true
```

Let's create a c-view-task-list module and component to display information about related tasks.

```bash
$ npx ng generate module lm-client/c-view-task-list
$ npx ng generate component lm-client/c-view-task-list --export=true
```

### Let's create a loadable module _lm-task_ for working with tasks.

Let's add a domain module for working with tasks to our application. This module will be lazy loaded along the _lm-task_ route.

```bash
$ npx ng generate module lm-task --routing=true --route=lm-task --module=app-routing.module
```

- `--routing=true` - generate module routing.

- `--route=lm-task` - the name of the route for the lazy load module. Creates a component in a new module and adds a route to that component in the `Routes` specified in the module's `--module` option.

- `--module=app-routing.module` - a module in the `Routes` array which adds a route to a new component.

### Connecting the library module _lib-client_.

When assembling a module, all used entities (classes, services, components, and so on) fall into it. Both modules use the service for obtaining customer data _client-api.service_. This service is located in a separate library module _lib-client.module_. And the _lib-client.module_ module is listed in the import list in both modules: _client-list.module_, _client-view.module_.

Let's describe the service _client-api.service.ts_ in the list of providers of the module _lib-client.module.ts_.

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MD_NAME, MD_COLOR } from './_consts/lib-client.consts';
import { ClientApiService } from './_services/client-api.service';
import { ClientService } from './_services/client.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ClientApiService,
    ClientService
  ]
})
export class LibClientModule {
  constructor() {
    console.log(MD_NAME + 'LibClientModule();', MD_COLOR);
  }
}
```

The result of loading the route _/lm-client/list_.

![img5-a-client-list.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-a-client-list.png)

You can see in the console that before creating the _client-list.component_ component, our _client-api.service_ service is being created.

The result of loading the route _/lm-task_.

![img5-a-task.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-a-task.png)

You can see in the console that before the _lm-task.component_ component is created, our _client-api.service_ service is being re-created. Reloading the _lib-client.module_ module re-creates the _client-api.service_ service.

If you plan to use the service to transfer data from one module to another, then this option is not suitable.

### Improvement of the library module _lib-client_.

Let's modify the _lib-client.module_ module so that when it is reloaded, the _client-api.service_ service is not re-created.

```ts
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
```

In the section on providers, we describe a new provider with the _ClientApiService_ type, which is created using the _CLIENT_API_SERVICE_FACTORY_ factory function. When this factory function is created, an instance of _ClientApiService_ is passed. If an instance of _ClientApiService_ already exists, then it is he who will be returned. If there is no _ClientApiService_ instance yet, it will be created.

From the _angular.io/api/core_ documentation:

[Optional](https://angular.io/api/core/Optional) Parameter decorator to be used on constructor parameters, which marks the parameter as being an optional dependency. The DI framework provides null if the dependency is not found.

[SkipSelf](https://angular.io/api/core/SkipSelf) Parameter decorator to be used on constructor parameters, which tells the DI framework to start dependency resolution from the parent injector. Resolution works upward through the injector hierarchy, so the local injector is not checked for a provider.

This has been done in the Angular CDK.

The result of loading the route _/lm-client/list_.



![img5-b-client-list.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-b-client-list.png)

The result of loading the route _/lm-task_.



![img5-b-task.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-b-task.png)

In the console, you can see that when the _lib-client.module_ module is re-created, the _client-api.service_ service is not re-created, but a single instance of this service is used.

### Modification of the loadable module _lm-task_ for working with tasks.

Let's create a common header for the task list and task properties _t-header_ component.

```bash
$ npx ng generate module lm-task/t-header
$ npx ng generate component lm-task/t-header --export=true
```

### Let's create a library module _lib-task_ for common entities by tasks.

Let's separate the service for tasks _task-api_ into a separate library module _lib-task_.

```bash
$ npx ng generate module lib-task
```

Let's create an interface for a data-transport object based on task data.

```bash
$ npx ng generate interface lib-task/_interfaces/task-dto interface
```

Let's create a service for interacting with the server based on task data.

```bash
$ npx ng generate service lib-task/_services/task-api
```

Let's create a service for working with task data. There will be some business logic in this service.

```bash
$ npx ng generate service lib-task/_services/task
```

While we do not have a BackEnd, we will create an interceptor to simulate server responses.

```bash
$ npx ng generate interceptor _interceptors/mock-task --skipTests=true
```

Let's create a component for displaying a list of tasks.

```bash
$ npx ng generate module lib-task/task-grid
$ npx ng generate component lib-task/task-grid --export=true
```

### Let's create a loadable module _task-list_ for the task list.

Let's create a module and a component for displaying a list of tasks. This module will be lazy loaded along the '_list_' route.

```bash
$ npx ng generate module lm-task/task-list --route=list --module=lm-task-routing.module
```

### Let's create a loadable module _task-view_ for task properties.

Let's create a module and a component for displaying task properties. This module will be loaded by lazy loading along the '_view/:taskId_' route.

```bash
$ npx ng generate module lm-task/task-view --route=view/:taskId --module=lm-task-routing.module
```

Let's create a module and a _t-view_ component to display tabs with information on this task.

```bash
$ npx ng generate module lm-task/t-view
$ npx ng generate component lm-task/t-view --export=true
```

Let's create a t-view-info module and component to display information about task properties.

```bash
$ npx ng generate module lm-task/t-view-info
$ npx ng generate component lm-task/t-view-info --export=true
```

When creating a domain module that is associated with a global menu item, we expect it to be a completely independent module. But a situation often arises when one domain module uses components of another domain module.

For example, the domain module _lm-task_ has a component for displaying a list of tasks. And the same component is used in the domain module _lm-client_ to display the list of tasks for the selected client. We know that building a lazy load module includes all the components that are required to make it work. It turns out that the component for displaying the list of tasks will be loaded both when loading the _lm-task_ domain module and when loading the _lm-client_ domain module. Let's figure this out.

Let's build the project:

```bash
$ npx ng build
```

and see what happens in the _dist_ directory. In this directory, we see all the modules for our application.

```bash
client-list-client-list-module.js
  !*** ./src/app/lib-client/client-grid/client-grid.module.ts ***!
  !*** ./src/app/lm-client/client-list/client-list-routing.module.ts ***!
  !*** ./src/app/lib-client/client-grid/client-grid.component.ts ***!
  !*** ./src/app/lm-client/client-list/client-list.component.ts ***!
  !*** ./src/app/lm-client/client-list/client-list.module.ts ***!

client-view-client-view-module.js
  !*** ./src/app/lm-client/c-view-task-list/c-view-task-list.component.ts ***!
  !*** ./src/app/lm-client/client-view/client-view-routing.module.ts ***!
  !*** ./src/app/lm-client/c-view-info/c-view-info.component.ts ***!
  !*** ./src/app/lm-client/client-view/client-view.module.ts ***!
  !*** ./src/app/lm-client/c-view/c-view.component.ts ***!
  !*** ./src/app/lm-client/c-view-info/c-view-info.module.ts ***!
  !*** ./src/app/lm-client/client-view/client-view.component.ts ***!
  !*** ./src/app/lm-client/c-view-task-list/c-view-task-list.module.ts ***!
  !*** ./src/app/lm-client/c-view/c-view.module.ts ***!

default~client-list-client-list-module~client-view-client-view-module~task-list-task-list-module.js

default~client-list-client-list-module~client-view-client-view-module~task-list-task-list-module~tas~37961fb9.js

default~client-view-client-view-module~task-list-task-list-module.js
  !*** ./src/app/lib-task/task-grid/task-grid.component.ts ***!
  !*** ./src/app/lib-task/task-grid/task-grid.module.ts ***!

lm-client-lm-client-module.js
  !*** ./src/app/lm-client/lm-client-routing.module.ts ***!
  !*** ./src/app/lm-client/lm-client.component.ts ***!
  !*** ./src/app/lm-client/_consts/lm-client.consts.ts ***!
  !*** ./src/app/lm-client/lm-client.module.ts ***!

lm-task-lm-task-module.js
  !*** ./src/app/lm-task/_consts/lm-task.consts.ts ***!
  !*** ./src/app/lm-task/lm-task.component.ts ***!
  !*** ./src/app/lm-task/lm-task-routing.module.ts ***!
  !*** ./src/app/lm-task/lm-task.module.ts ***!

task-list-task-list-module.js
  !*** ./src/app/lm-task/task-list/task-list.module.ts ***!
  !*** ./src/app/lm-task/task-list/task-list-routing.module.ts ***!
  !*** ./src/app/lm-task/task-list/task-list.component.ts ***!

task-view-task-view-module.js
  !*** ./src/app/lm-task/t-view/t-view.module.ts ***!
  !*** ./src/app/lm-task/task-view/task-view.component.ts ***!
  !*** ./src/app/lm-task/t-view-info/t-view-info.module.ts ***!
  !*** ./src/app/lm-task/task-view/task-view.module.ts ***!
  !*** ./src/app/lm-task/t-view/t-view.component.ts ***!
  !*** ./src/app/lm-task/task-view/task-view-routing.module.ts ***!
  !*** ./src/app/lm-task/t-view-info/t-view-info.component.ts ***!
```

As you can see, each JS module contains the entities that are used in it.

The sequence of loading modules for the route `/lm-client/3/view/task-list`:

- root route _app-routing_
- along the route `/lm-client` the module _lm-client_ is loaded
- the _client-view_ module is loaded along the route `/view`
- along the route `/:clientId/task-list` the module _c-view-task-list_ is loaded
- the component _c-view-task-list_ is loaded
- the _task-grid_ component is used

Module loads for the route `/lm-task/list`:

- root route _app-routing_
- along the route `/lm-task` the module _lm-task_ is loaded
- the _task-list_ module is loaded along the route `/list`
- the _task-list_ component is loaded
- the _task-grid_ component is used

Let's consider the scheme of loading modules of our project.

![img5-client-view-task-list](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-client-view-task-list.png)

We see that two libraries are imported into the modules: _lm-client_ and _lm-task_: _lib-client_ and _lib-task_. At the same time, the _lib-task_ library contains the implementation of the _task-grid_ task list display component, which is further used. And so that these libraries would not be reloaded, they were moved by the optimizer into a separate module _default~client-view~task-list_.

The result of loading the route _/lm-client/view/1/task-list_.

![img5-c-client-task-grid.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-c-client-task-grid.png)

From the figure you can see that the _default~client-view~task-list_ module, which contains the _task-grid_ task list display component, is loaded.

The result of loading the route _/lm-task/list_.

![img5-c-task-task-grid.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-c-task-task-grid.png)

The figure shows that when we switched to another route, the _default~client-view~task-list_ module is not reloaded.

Conclusion: if you need to use one component in two domain modules that are loaded by lazy loading, then you need to move this component into a separate library (module). And optimizer this library into a separate loadable module. And this module will only be loaded once.

We can not add the modules: _lib-client_ and _lib-task_ to the import list in any other module and everything will work correctly. The optimizer will also create the _default~client-view~task-list_ module, which will be loaded only once.



The source code can be downloaded from [github-crm-simple5](https://github.com/alx-melnichuk/crm-simple5). (Run `npm install` before starting the application.)

You can launch the project on the StackBlitz website by following the link [https://stackblitz.com/github/alx-melnichuk/crm-simple5](https://stackblitz.com/github/alx-melnichuk/crm-simple5).