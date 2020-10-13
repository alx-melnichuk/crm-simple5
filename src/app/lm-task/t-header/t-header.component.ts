import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';

import { NavItem } from '../../nav/_interfaces/nav.interface';
import * as Cnst from '../_consts/lm-task.consts';

@Component({
  selector: 'app-t-header',
  templateUrl: './t-header.component.html',
  styleUrls: ['./t-header.component.scss']
})
export class THeaderComponent implements OnInit, OnChanges {

  @Input()
  public isHideNav: boolean;
  @Input()
  public taskId: number;
  @Input()
  public clientId: number;
  @HostBinding('class.no-focus')
  get noFocus(): boolean { return true; }
  set noFocus(value: boolean) {}

  public navList: NavItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.taskId != null || changes.clientId != null) {
      this.navList = this.getNavItems(this.taskId, this.clientId);
    }
  }

  // ** Private API **

  private getNavItems(taskId: number, clientId: number): NavItem[] {
    const result: NavItem[] = [];
    result.push({ code: Cnst.RB_LIST, name: Cnst.L_TASK_LIST, routerLink: Cnst.RT_LM_TASK_LIST });
    if (taskId) {
      const infoLink = Cnst.RT_LM_TASK_VIEW_TASK_ID_INFO.replace(':' + Cnst.RP_TASK_ID, String(taskId));
      result.push({ code: Cnst.RB_INFO, name: Cnst.L_INFO, routerLink: infoLink });
      if (clientId != null) {
        const clientLink = '/lm-client/view/:clientId/info'.replace(':clientId', String(clientId));
        result.push({ code: 'client', name: 'client', routerLink: clientLink });
      }
    }
    return result;
  }
}
