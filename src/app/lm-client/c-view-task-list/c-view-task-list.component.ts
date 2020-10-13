import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MD_NAME, MD_COLOR, RP_CLIENT_ID } from '../_consts/lm-client.consts';
import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { TaskDto } from '../../lib-task/_interfaces/task-dto.interface';
import { TaskService } from '../../lib-task/_services/task.service';

@Component({
  selector: 'app-c-view-task-list',
  templateUrl: './c-view-task-list.component.html',
  styleUrls: ['./c-view-task-list.component.scss']
})
@AutoUnsubscribe()
export class CViewTaskListComponent implements OnInit {

  public clientId: number;
  public taskList: TaskDto[];

  private unsubClientId: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    console.log(MD_NAME + 'CViewTaskListComponent();', MD_COLOR);
  }

  ngOnInit(): void {
    this.unsubClientId = this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has(RP_CLIENT_ID)) {
          const clientIdText = params.get(RP_CLIENT_ID);
          this.clientId = (!!clientIdText ? Number(clientIdText) : null);
        }
        if (this.clientId != null) {
          this.loadDtoList(this.clientId);
        }
      });
  }

  // ** Public API **

  public doClickRow(taskDto: TaskDto): void {
    if (taskDto != null && taskDto.id != null) {
      const url = '/lm-task/view/:taskId/info'.replace(':taskId', String(taskDto.id));
      this.router.navigate([url]);
    }
  }

  // ** Private API **

  private async loadDtoList(clientId: number): Promise<void> {
    this.taskList = undefined;
    const response: TaskDto[] = await this.taskService.getDtoList({ clientId }).toPromise();
    this.taskList = (response || []);
  }
}
