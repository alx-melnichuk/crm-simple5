import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavModule } from '../../nav/nav.module';

import { THeaderComponent } from './t-header.component';

@NgModule({
  declarations: [THeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavModule
  ],
  exports: [THeaderComponent]
})
export class THeaderModule { }
