import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TaskDto } from '../../lib-task/_interfaces/task-dto.interface';

@Component({
  selector: 'app-t-view',
  templateUrl: './t-view.component.html',
  styleUrls: ['./t-view.component.scss']
})
export class TViewComponent implements OnInit, OnChanges {

  @Input()
  public task: TaskDto;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task != null && this.task == null) {
      this.task = ({} as TaskDto);
    }
  }
}
