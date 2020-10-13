import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { MD_NAME, MD_COLOR, RP_CLIENT_ID } from '../_consts/lm-client.consts';
import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { ClientDto } from '../../lib-client/_interfaces/client-dto.interface';
import { ClientService } from '../../lib-client/_services/client.service';

@Component({
  selector: 'app-c-view-info',
  templateUrl: './c-view-info.component.html',
  styleUrls: ['./c-view-info.component.scss']
})
@AutoUnsubscribe()
export class CViewInfoComponent implements OnInit {

  public clientId: number;
  public client: ClientDto;

  private unsubClientId: Subscription;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    console.log(MD_NAME + 'CViewInfoComponent();', MD_COLOR);
  }

  ngOnInit(): void {
    this.unsubClientId = this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has(RP_CLIENT_ID)) {
          const clientIdText = params.get(RP_CLIENT_ID);
          this.clientId = (!!clientIdText ? Number(clientIdText) : null);
        }
        if (this.clientId != null) {
          this.loadDto(this.clientId);
        }
      });
  }

  // ** Private API **

  private async loadDto(clientId: number): Promise<void> {
    this.client = undefined;
    const response: ClientDto[] = await this.clientService.getDtoList({ ids: [clientId] }).toPromise();
    const clientList: ClientDto[] = (response || []);
    this.client = (clientList.length > 0 ? clientList[0] : null);
  }

}
