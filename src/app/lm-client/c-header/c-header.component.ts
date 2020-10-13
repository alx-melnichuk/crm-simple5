import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

import { NavItem } from '../../nav/_interfaces/nav.interface';
import * as Cnst from '../_consts/lm-client.consts';

@Component({
  selector: 'app-c-header',
  templateUrl: './c-header.component.html',
  styleUrls: ['./c-header.component.scss']
})
export class CHeaderComponent implements OnInit, OnChanges {

  @Input()
  public isHideNav: boolean;
  @Input()
  public clientId: number;
  @HostBinding('class.no-focus')
  get noFocus(): boolean { return true; }
  set noFocus(value: boolean) {}

  public navList: NavItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.clientId != null) {
      this.navList = this.getNavItems(this.clientId);
    }
  }

  // ** Private API **

  private getNavItems(clientId: number): NavItem[] {
    const result: NavItem[] = [];
    result.push({ code: Cnst.RB_LIST, name: Cnst.L_CLIENT_LIST, routerLink: Cnst.RT_LM_CLIENT_LIST });
    if (clientId != null) {
      const clientInfoLink = Cnst.RT_LM_CLIENT_VIEW_CLIENT_ID_INFO.replace(':' + Cnst.RP_CLIENT_ID, String(clientId));
      result.push({ code: Cnst.RB_INFO, name: Cnst.L_INFO, routerLink: clientInfoLink });
      const taskListLink = Cnst.RT_LM_CLIENT_VIEW_CLIENT_ID_TASKS.replace(':' + Cnst.RP_CLIENT_ID, String(clientId));
      result.push({ code: Cnst.RB_TASK_LIST, name: Cnst.L_TASK_LIST, routerLink: taskListLink });
    }
    return result;
  }

}
