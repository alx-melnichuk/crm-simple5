import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavModule } from '../../nav/nav.module';

import { CHeaderComponent } from './c-header.component';

@NgModule({
  declarations: [CHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavModule
  ],
  exports: [CHeaderComponent]
})
export class CHeaderModule { }
