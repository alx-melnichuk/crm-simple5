import { Component, OnInit } from '@angular/core';

import { MD_NAME, MD_COLOR } from './_consts/lm-client.consts';

@Component({
  selector: 'app-lm-client',
  templateUrl: './lm-client.component.html',
  styleUrls: ['./lm-client.component.scss']
})
export class LmClientComponent implements OnInit {

  constructor() {
    console.log(MD_NAME + 'LmClientComponent();', MD_COLOR);
  }

  ngOnInit(): void {
  }

}
