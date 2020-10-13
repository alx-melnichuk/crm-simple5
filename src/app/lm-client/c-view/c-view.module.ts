import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CViewComponent } from './c-view.component';

@NgModule({
  declarations: [CViewComponent],
  imports: [
    CommonModule
  ],
  exports: [CViewComponent]
})
export class CViewModule { }
