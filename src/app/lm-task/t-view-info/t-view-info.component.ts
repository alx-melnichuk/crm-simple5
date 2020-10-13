import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { MD_NAME, MD_COLOR, RP_TASK_ID } from '../_consts/lm-task.consts';
import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { TaskDto } from '../../lib-task/_interfaces/task-dto.interface';
import { TaskService } from '../../lib-task/_services/task.service';

@Component({
  selector: 'app-t-view-info',
  templateUrl: './t-view-info.component.html',
  styleUrls: ['./t-view-info.component.scss']
})
@AutoUnsubscribe()
export class TViewInfoComponent implements OnInit {

  public taskId: number;
  public task: TaskDto;

  private unsubTaskId: Subscription;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    console.log(MD_NAME + 'TViewInfoComponent();', MD_COLOR);
  }

  ngOnInit(): void {
    this.unsubTaskId = this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has(RP_TASK_ID)) {
          const taskIdText = params.get(RP_TASK_ID);
          this.taskId = (!!taskIdText ? Number(taskIdText) : null);
        }
        if (this.taskId != null) {
          this.loadDto(this.taskId);
        }
      });
  }

  // ** Private API **

  private async loadDto(taskId: number): Promise<void> {
    this.task = undefined;
    const response: TaskDto[] = await this.taskService.getDtoList({ ids: [taskId] }).toPromise();
    const taskList: TaskDto[] = (response || []);
    this.task = (taskList.length > 0 ? taskList[0] : null);
  }

}
