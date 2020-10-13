import { Component, OnInit } from '@angular/core';

import { MD_NAME, MD_COLOR } from '../_consts/lm-client.consts';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  constructor() {
    console.log(MD_NAME + 'ClientViewComponent();', MD_COLOR);
  }

  ngOnInit(): void {
  }

}
