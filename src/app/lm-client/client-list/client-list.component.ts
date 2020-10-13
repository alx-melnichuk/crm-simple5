import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { L_CLIENT_LIST, RT_LM_CLIENT_VIEW_CLIENT_ID_INFO, RP_CLIENT_ID, MD_NAME, MD_COLOR } from '../_consts/lm-client.consts';
import { ClientService } from '../../lib-client/_services/client.service';
import { ClientDto } from '../../lib-client/_interfaces/client-dto.interface';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  public labelName = L_CLIENT_LIST;
  public clientList: ClientDto[];

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {
    console.log(MD_NAME + 'ClientListComponent();', MD_COLOR);
  }

  ngOnInit(): void {
    this.loadDataList([]);
  }

  // ** Public API **

  public doClickRow(clientDto: ClientDto): void {
    if (clientDto != null && clientDto.id != null) {
      const url = RT_LM_CLIENT_VIEW_CLIENT_ID_INFO.replace(':' + RP_CLIENT_ID, String(clientDto.id));
      this.router.navigate([url]);
    }
  }

  // ** Private API **

  private async loadDataList(ids: number[]): Promise<void> {
    this.clientList = undefined;
    const response: ClientDto[] = await this.clientService.getDtoList({ ids }).toPromise();
    this.clientList = (response || []);
  }
}
