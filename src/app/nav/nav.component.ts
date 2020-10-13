import { Component, OnInit, Input } from '@angular/core';

import { NavItem } from './_interfaces/nav.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input()
  public navList: NavItem[];
  @Input()
  public isDisplayAsLink: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // ** Public API **

  public trackById(index: number, item: NavItem): string {
    return item.code;
  }
}
