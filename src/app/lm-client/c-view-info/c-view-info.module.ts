import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHeaderModule } from '../c-header/c-header.module';
import { CViewModule } from '../c-view/c-view.module';

import { CViewInfoComponent } from './c-view-info.component';

@NgModule({
  declarations: [CViewInfoComponent],
  imports: [
    CommonModule,
    CHeaderModule,
    CViewModule
  ],
  exports: [CViewInfoComponent]
})
export class CViewInfoModule { }
