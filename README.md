# CrmSimple

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



Создать каталог для проекта перейти в него:
```bash
$ mkdir /home/alexey/ws_ts3/crm-simple5 && cd /home/alexey/ws_ts3/crm-simple5
```

Установить локально требуемую версию @angular/cli (использовалась версия Angular 10):
```bash
$ npm install @angular/cli@10
```
В результате в текущем каталоге появляется новый подкаталог 'node_modules',
в котором содержится требуемая версия @angular/cli.

Выполнить создание рабочего пространство для основного приложения crm-simple:
```bash
$ npx ng new crm-simple --directory=. --routing=true --style=scss
```
- `ng new crm-simple` - создать новое приложение
- `--directory=.` - в текущем каталоге
- `--routing=true` - генерировать модуль routing
- `--style=scss` - использовать preprocessor 'scss'

//$ git config user.name "alx-melnichuk"
//$ git config user.email alx.melnichuk@gmail.com


Добавим в наше приложение доменный модуль по работе с клиентами.
```bash
$ npx ng generate module lm-client --routing=true --route=lm-client --module=app-routing.module
```

- `--routing=true` - генерировать модуль routing.
- `--route=lm-client` - наименование маршрута для модуля с отложенной загрузкой. Создает компонент в новом модуле и добавляет маршрут к этому компоненту в `Routes`, указанного в модуле опции `--module`.
- `--module=app-routing.module` - модуль в массив `Routes` которого добавляет маршрут к новому компоненту.


Добавим в наше приложение доменный модуль по работе с задачами.
```bash
$ npx ng generate module lm-task --routing=true --route=lm-task --module=app-routing.module
```


### Создание модуля-библиотеки _lib-client_ для работы с данными о клиентах.

Добавим в проект модуль _lib-client_.
```bash
$ npx ng generate module lib-client --routing=false
```

Для продолжения переходим в каталог:

```bash
$ cd /home/alexey/ws_ts3/crm-simple5/src/app/lib-client/
```

Создадим интерфейс, в котором описаны свойства клиента.

```bash
$ npx ng generate interface _interfaces/clientDto interface
```

Создадим сервис для работы с данными о клиентах.

```bash
$ npx ng generate service /_services/client-api
```





Создать сборку:
```bash
$ npx ng build
```


Создадим сервис _Resolve_ для получения данных списка задач.

```bash
$ npx ng generate service /task-list/_resolvers/task-list-resolver
```

Создадим модуль и компонент для свойств задачи.

```bash
$ npx ng generate module task-view
$ npx ng generate component task-view --export=true
```
Запустим и проверим работоспособность всего приложения командой:
```bash
$ npx ng serve --port 4250
```
И в браузере проверить по ссылке:
[http://localhost:4250/lm-client](http://localhost:4250/lm-client)



const routes: Routes = [
    {
        path: 'admin',
        loadChildren: async () => {
            const a = await import('admin')
            return a['AdminModule'];
        }
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
