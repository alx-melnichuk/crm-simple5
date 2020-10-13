import { Component, OnInit } from '@angular/core';

import { MD_NAME, MD_COLOR } from '../_consts/lm-task.consts';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor() {
    console.log(MD_NAME + 'TaskViewComponent();', MD_COLOR);
  }

  ngOnInit(): void {
  }
}
