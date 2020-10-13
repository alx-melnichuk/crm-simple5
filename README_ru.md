> Статья на английском языке [README.md](https://github.com/alx-melnichuk/crm-simple5/blob/master/README.md)

## Приложение _Angular_ с подгружаемыми модулями ленивой загрузкой.

### Введение

Приложение _Angular_ состоит из модулей, в которых хранятся компоненты, директивы, службы и так далее. Со временем, в приложение добавляется новый функционал и увеличивается количество его модулей. Как следствие - увеличивается общее время его загрузки. Для сокращения времени загрузки приложения можно применить асинхронную маршрутизацию (lazy load). Асинхронная загрузка позволяет загружать модули в момент обращения пользователя к пункту глобального меню (маршруту).

Создадим приложение, в котором будет несколько функциональных модулей. Каждый такой модуль будем называть доменным и в нем будет сосредоточена функциональность по работе с определенной сущностью. Эти доменные модули будут загружаться ленивой загрузкой (_lm - loadable modules_).

### Создадим основное приложение.

Создать каталог для проекта перейти в него:

```bash
$ mkdir /home/alexey/ws_ts3/crm-simple5 && cd /home/alexey/ws_ts3/crm-simple5
```

Установить локально требуемую версию @angular/cli (использовалась версия Angular 10):
```bash
$ npm install @angular/cli@10
```
Можно установить локально последнюю версию:
```bash
$ npm install @angular/cli@latest
```
В результате в текущем каталоге появляется новый подкаталог `node_modules`, в котором содержится требуемая версия `@angular/cli`.

Выполнить создание рабочего пространства и основного приложения _crm-simple_:
```bash
$ npx ng new crm-simple --directory=. --routing=true --style=scss
```
- `ng new crm-simple` - создать новое приложение
- `--directory=.` - в текущем каталоге
- `--routing=true` - генерировать модуль routing
- `--style=scss` - использовать preprocessor 'scss'

### Добавим в проект  _Angular Material_.

Библиотека _Angular Material_ содержит много компонент, которые нам потребуются. С описанием этой библиотеки можно ознакомится на сайте [https://material.angular.io/](https://material.angular.io/).

Добавим в проект библиотеку _Angular Material_ версии 10, так как был установлен _Angular_ версии 10.
```bash
$ npx ng add @angular/material@10
```
На все вопросы отвечаем по умолчанию.

### Создадим загружаемый модуль _lm-client_ для работы с клиентами.

Добавим в наше приложение доменный модуль по работе с клиентами. Этот модуль будет грузиться ленивой загрузкой по маршруту _lm-client_. Данный модуль является промежуточным доменным модулем, так после него должен загружаться основной доменный модуль.

```bash
$ npx ng generate module lm-client --routing=true --route=lm-client --module=app-routing.module
```

- `--routing=true` - генерировать модуль routing.
- `--route=lm-client` - наименование маршрута для модуля с отложенной загрузкой. Создает компонент в новом модуле и добавляет маршрут к этому компоненту в `Routes`, указанного в модуле опции `--module`.
- `--module=app-routing.module` - модуль в массив `Routes` которого добавляет маршрут к новому компоненту.

Создадим общий заголовок для списка клиентов и свойств клиента компонент _c-header_.

```bash
$ npx ng generate module lm-client/c-header
$ npx ng generate component lm-client/c-header --export=true
```

### Создадим библиотечный модуль _lib-client_ для общих сущностей по клиентам.

Выделим сервис по клиентам _client-api_ в отдельный библиотечный модуль _lib-client_.

```bash
$ npx ng generate module lib-client
```

Создадим интерфейс для дата-транспорт объект по данным о клиенте.

```bash
$ npx ng generate interface lib-client/_interface/client-dto interface
```

Создадим сервис для взаимодействия с сервером по данным клиента.

```bash
$ npx ng generate service lib-client/_services/client-api
```

Создадим сервис для работы с данными клиента. В этом сервисе будет некоторая бизнес логика.

```bash
$ npx ng generate service lib-client/_services/client
```

Пока у нас нет BackEnd создадим перехватчик для имитации ответов сервера. И так как модуль _HttpClientModule_ добавлен в список импортов в основном модуле _AppModule_, то и перехватчик то же должен там быть.

```bash
$ npx ng generate interceptor _interceptors/mock-client --skipTests=true
```

Создадим компонент для отображения списка клиентов.

```bash
$ npx ng generate module lib-client/client-grid
$ npx ng generate component lib-client/client-grid --export=true
```

### Создадим загружаемый модуль _client-list_ для списка клиентов.

Создадим модуль и компонент для отображения списка клиентов. Этот модуль будет грузиться  ленивой загрузкой по маршруту '_list_'.

```bash
$ npx ng generate module lm-client/client-list --route=list --module=lm-client-routing.module
```

### Создадим загружаемый модуль _client-view_ для свойств клиента.

Создадим модуль и компонент для отображения свойств клиентов. Этот модуль будет грузиться ленивой загрузкой по маршруту '_view/:clientId_'.

```bash
$ npx ng generate module lm-client/client-view --route=view/:clientId --module=lm-client-routing.module
```

Создадим модуль и компонент _c-view_ для отображения вкладок с информацией по данном клиенте.

```bash
$ npx ng generate module lm-client/c-view
$ npx ng generate component lm-client/c-view --export=true
```

Создадим модуль и компонент c-view-info для отображения информации о свойствах лиента.

```bash
$ npx ng generate module lm-client/c-view-info
$ npx ng generate component lm-client/c-view-info --export=true
```

Создадим модуль и компонент c-view-task-list для отображения информации о связанных задачах.

```bash
$ npx ng generate module lm-client/c-view-task-list
$ npx ng generate component lm-client/c-view-task-list --export=true
```

### Создадим загружаемый модуль _lm-task_ для работы с задачами.

Добавим в наше приложение доменный модуль по работе с задачами. Этот модуль будет грузиться по ленивой загрузке по маршруту _lm-task_.

```bash
$ npx ng generate module lm-task --routing=true --route=lm-task --module=app-routing.module
```

- `--routing=true` - генерировать модуль routing.

- `--route=lm-task` - наименование маршрута для модуля с отложенной загрузкой. Создает компонент в новом модуле и добавляет маршрут к этому компоненту в `Routes`, указанного в модуле опции `--module`.

- `--module=app-routing.module` - модуль в массив `Routes` которого добавляет маршрут к новому компоненту.

### Подключение библиотечного модуля _lib-client_.

При сборке модуля, в него попадают все используемые сущности (классы, сервисы, компоненты и так далее). Оба модуля используют сервис получения данных о клиентах _client-api.service_. Этот сервис находится в отдельном библиотечном модуле _lib-client.module_. И модуль _lib-client.module_ указан в списке импорта в обоих модулях: _client-list.module_, _client-view.module_.

Опишем сервис _client-api.service.ts_ в списке провайдеров модуля _lib-client.module.ts_.

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

Результат загрузки маршрута _/lm-client/list_.

![img5-a-client-list.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-a-client-list.png)

В консоли видно, что перед созданием компонента _client-list.component_ выполняется создание нашего сервиса _client-api.service_.

Результат загрузки маршрута _/lm-task_.

![img5-a-task.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-a-task.png)

В консоли видно, что перед созданием компонента _lm-task.component_ выполняется повторное создание нашего сервиса _client-api.service_. При повторной загрузке модуля _lib-client.module_ выполняется повторное создание сервиса _client-api.service_.

Если планируется использовать сервис для передачи данных из одного модуля в другой, то такой вариант не подходит. 

### Доработка библиотечного модуля _lib-client_.

Выполним доработку модуля _lib-client.module_ таким образом, что бы при повторной его загрузке сервис _client-api.service_ повторно не создавался.

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

В разделе провайдеры описываем новый провайдер с типом _ClientApiService_, для создания которого используется фабричная функция _CLIENT_API_SERVICE_FACTORY_. При создании этой фабричной функции передается экземпляр _ClientApiService_. Если экземпляр _ClientApiService_ уже существует, то именно он и будет возвращаться. Если экземпляра _ClientApiService_ еще нет, то он будет создан.

Из документации _angular.io/api/core_ :

[Optional](https://angular.io/api/core/Optional) Декоратор параметра, который будет использоваться для параметров конструктора, который отмечает параметр как необязательную зависимость. Платформа DI предоставляет значение null, если зависимость не обнаружена.

[SkipSelf](https://angular.io/api/core/SkipSelf) Декоратор параметров, который будет использоваться в параметрах конструктора, который сообщает платформе DI начать разрешение зависимостей из родительского инжектора. Разрешение работает вверх по иерархии инжекторов, поэтому локальный инжектор не проверяется на провайдера.

Так было реализовано в Angular CDK.

Результат загрузки маршрута _/lm-client/list_.

![img5-b-client-list.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-b-client-list.png)

Результат загрузки маршрута _/lm-task_.

![img5-b-task.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-b-task.png)

В консоли видно, что при повторном создании модуля _lib-client.module_ сервис _client-api.service_ повторно не создается, а используется единственный экземпляр данного сервиса.

### Доработка загружаемого модуля _lm-task_ для работы с задачами.

Создадим общий заголовок для списка задач и свойств задачи компонент _t-header_.

```bash
$ npx ng generate module lm-task/t-header
$ npx ng generate component lm-task/t-header --export=true
```

### Создадим библиотечный модуль _lib-task_ для общих сущностей по задачам.

Выделим сервис по задачам _task-api_ в отдельный библиотечный модуль _lib-task_.

```bash
$ npx ng generate module lib-task
```

Создадим интерфейс для дата-транспорт объект по данным о задаче.

```bash
$ npx ng generate interface lib-task/_interfaces/task-dto interface
```

Создадим сервис для взаимодействия с сервером по данным о задачах.

```bash
$ npx ng generate service lib-task/_services/task-api
```

Создадим сервис для работы с данными о задачах. В этом сервисе будет некоторая бизнес логика.

```bash
$ npx ng generate service lib-task/_services/task
```

Пока у нас нет BackEnd создадим перехватчик для имитации ответов сервера.

```bash
$ npx ng generate interceptor _interceptors/mock-task --skipTests=true
```

Создадим компонент для отображения списка задач.

```bash
$ npx ng generate module lib-task/task-grid
$ npx ng generate component lib-task/task-grid --export=true
```

### Создадим загружаемый модуль _task-list_ для списка задач.

Создадим модуль и компонент для отображения списка задач. Этот модуль будет грузиться  ленивой загрузкой по маршруту '_list_'.

```bash
$ npx ng generate module lm-task/task-list --route=list --module=lm-task-routing.module
```

### Создадим загружаемый модуль _task-view_ для свойств задачи.

Создадим модуль и компонент для отображения свойств задачи. Этот модуль будет грузиться ленивой загрузкой по маршруту '_view/:taskId_'.

```bash
$ npx ng generate module lm-task/task-view --route=view/:taskId --module=lm-task-routing.module
```

Создадим модуль и компонент _t-view_ для отображения вкладок с информацией по данной задаче.

```bash
$ npx ng generate module lm-task/t-view
$ npx ng generate component lm-task/t-view --export=true
```

Создадим модуль и компонент t-view-info для отображения информации о свойствах задачи.

```bash
$ npx ng generate module lm-task/t-view-info
$ npx ng generate component lm-task/t-view-info --export=true
```

При создании доменного модуля, который связан с глобальным пунктом меню, мы рассчитываем, что это будет полностью независимый модуль. Но часто возникает ситуация, когда один доменный модуль использует компоненты другого доменного модуля.

Например, в доменном модуле _lm-task_ имеется компонент для отображения списка задач. И этот же компонент используется в доменном модуле _lm-client_ для отображения списка задач у выбранного клиента. Мы знаем, что при сборке модуля ленивой загрузи в него включаются все компоненты, которые требуются для его работы. Получается, что компонент для отображения списка задач, будет загружаться как при загрузке доменного модуля _lm-task_, так и при загрузке доменного модуля _lm-client_. Давайте в этом разберемся.

Выполним сборку проекта:

```bash
$ npx ng build
```

и посмотрим, что получилось в каталоге _dist_. В данном каталоге мы видим все модули для работы нашего приложения.

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

Как видно, каждый модуль JS содержит сущности, которые в нем используются.

Последовательность загрузки модулей для маршрута `/lm-client/3/view/task-list`:

- корневой маршрут _app-routing_
- по маршруту `/lm-client` загружается модуль _lm-client_
- по маршруту `/view`  загружается модуль _client-view_
- по маршруту `/:clientId/task-list` загружается модуль _c-view-task-list_
- загружается компонент _c-view-task-list_
- используется компонент _task-grid_

Загрузки модулей для маршрута `/lm-task/list`:

- корневой маршрут _app-routing_
- по маршруту `/lm-task` загружается модуль _lm-task_
- по маршруту `/list`  загружается модуль _task-list_
- загружается компонент _task-list_
- используется компонент _task-grid_

Рассмотрим схему загрузи модулей нашего проекта.

![img5-client-view-task-list](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-client-view-task-list.png)

Мы видим, что в модули: _lm-client_ и _lm-task_ импортируются две библиотеки: _lib-client_ и _lib-task_. При этом в библиотеке _lib-task_ находится реализация компонента отображения списка задач _task-grid_, который в дальнейшем используется. И для того, что бы эти библиотеки не загружались повторно они были вынесены оптимизатором в отдельный модуль _default~client-view~task-list_.

Результат загрузки маршрута _/lm-client/view/1/task-list_.

![img5-c-client-task-grid.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-c-client-task-grid.png)

Из рисунка видно, что модуль _default~client-view~task-list_, в котором содержится компонент отображения списка задач _task-grid_ загружен.

Результат загрузки маршрута _/lm-task/list_.

![img5-c-task-task-grid.png](https://raw.githubusercontent.com/alx-melnichuk/crm-simple5/main/img5-c-task-task-grid.png)

Из рисунка видно, что когда мы перешли на другой маршрут модуль _default~client-view~task-list_ повторно не загружается.

Вывод: если требуется использовать один компонент в двух доменных модулях, которые загружаются ленивой загрузкой, то необходимо вынести этот компонент в отдельную библиотеку (модуль). И оптимизатор эту библиотеку в отдельный загружаемый модуль. И этот модуль будет загружаться только один раз.

Мы можем не добавлять модули: _lib-client_ и _lib-task_ в список импорта ни в какой другой модуль и при этом все будет работать корректно. Оптимизатор так же создаст модуль _default~client-view~task-list_, который буде загружаться только один раз.



Исходный код можно скачать [github-crm-simple5](https://github.com/alx-melnichuk/crm-simple5). (Запустите  `npm install` перед запуском приложения.)

Запустить проект на сайте StackBlitz можно по ссылке [https://stackblitz.com/github/alx-melnichuk/crm-simple5](https://stackblitz.com/github/alx-melnichuk/crm-simple5).