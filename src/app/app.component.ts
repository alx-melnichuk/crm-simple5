import { Component, OnInit } from '@angular/core';

import { NavItem } from './nav/_interfaces/nav.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'crm-simple';
  public navItems: NavItem[] = this.getNavItems();

  ngOnInit(): void {
  }

  // ** Private API **

  private getNavItems(): NavItem[] {
    return [
      { code: 'client', name: 'Clients', routerLink: '/lm-client' },
      { code: 'task', name: 'Tasks', routerLink: '/lm-task' }
    ];
  }
}
