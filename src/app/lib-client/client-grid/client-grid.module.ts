import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ClientGridComponent } from './client-grid.component';

@NgModule({
  declarations: [ClientGridComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [ClientGridComponent]
})
export class ClientGridModule { }
