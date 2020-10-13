import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TViewComponent } from './t-view.component';

@NgModule({
  declarations: [TViewComponent],
  imports: [
    CommonModule
  ],
  exports: [TViewComponent]
})
export class TViewModule { }
