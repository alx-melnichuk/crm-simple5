import { Component, OnInit } from '@angular/core';

import { MD_NAME, MD_COLOR } from './_consts/lm-task.consts';

@Component({
  selector: 'app-lm-task',
  templateUrl: './lm-task.component.html',
  styleUrls: ['./lm-task.component.scss']
})
export class LmTaskComponent implements OnInit {

  constructor() {
    console.log(MD_NAME + 'LmTaskComponent();', MD_COLOR);
  }

  ngOnInit(): void {
  }

}
