import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { THeaderModule } from '../t-header/t-header.module';
import { TViewModule } from '../t-view/t-view.module';

import { TViewInfoComponent } from './t-view-info.component';

@NgModule({
  declarations: [TViewInfoComponent],
  imports: [
    CommonModule,
    THeaderModule,
    TViewModule
  ],
  exports: [TViewInfoComponent]
})
export class TViewInfoModule { }
