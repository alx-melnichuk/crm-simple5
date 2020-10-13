import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { TaskDto } from '../_interfaces/task-dto.interface';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.scss']
})
export class TaskGridComponent implements OnInit {

  @Input()
  public tasks: TaskDto[];
  @Input()
  public displayedColumns: string[] = this.getDisplayedColumns();

  @Output()
  readonly clickRow: EventEmitter<TaskDto> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  // ** Public API **

  public doClickRow(task: TaskDto): void {
    if (task != null && task.id != null) {
      this.clickRow.emit(task);
    }
  }

  // ** Private API **

  private getDisplayedColumns(): string[] {
    return [
      'id',
      'subject',
      // 'description',
      'message',
      'status',
      'startDate',
      'endDate',
      // 'warning',
      // 'error'
    ];
  }
}
