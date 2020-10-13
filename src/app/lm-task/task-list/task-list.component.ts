import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { L_TASK_LIST, RT_LM_TASK_VIEW_TASK_ID_INFO, RP_TASK_ID, MD_NAME, MD_COLOR } from '../_consts/lm-task.consts';
import { TaskService } from '../../lib-task/_services/task.service';
import { TaskDto } from '../../lib-task/_interfaces/task-dto.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public labelName = L_TASK_LIST;
  public taskList: TaskDto[];

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {
    console.log(MD_NAME + 'TaskListComponent();', MD_COLOR);
  }

  ngOnInit(): void {
    this.loadDtoList([]);
  }

  // ** Public API **

  public doClickRow(taskDto: TaskDto): void {
    if (taskDto != null && taskDto.id != null) {
      const url = RT_LM_TASK_VIEW_TASK_ID_INFO.replace(':' + RP_TASK_ID, String(taskDto.id));
      this.router.navigate([url]);
    }
  }

  // ** Private API **

  private async loadDtoList(ids: number[]): Promise<void> {
    this.taskList = undefined;
    const response: TaskDto[] = await this.taskService.getDtoList({ ids }).toPromise();
    this.taskList = (response || []);
  }
}
