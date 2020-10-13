import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHeaderModule } from '../c-header/c-header.module';
import { ClientGridModule } from '../../lib-client/client-grid/client-grid.module';

import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListComponent } from './client-list.component';

@NgModule({
  declarations: [ClientListComponent],
  imports: [
    CommonModule,
    ClientListRoutingModule,
    CHeaderModule,
    ClientGridModule
  ]
})
export class ClientListModule { }
