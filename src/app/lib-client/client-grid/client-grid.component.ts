import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ClientDto } from '../_interfaces/client-dto.interface';

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.scss']
})
export class ClientGridComponent implements OnInit {

  @Input()
  public clients: ClientDto[];
  @Input()
  public displayedColumns: string[] = this.getDisplayedColumns();

  @Output()
  readonly clickRow: EventEmitter<ClientDto> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  // ** Public API **

  public doClickRow(client: ClientDto): void {
    if (client != null && client.id != null) {
      this.clickRow.emit(client);
    }
  }

  // ** Private API **

  private getDisplayedColumns(): string[] {
    return [
      'id',
      'surname',
      'name',
      'patronymic',
     // 'email',
     // 'phone',
      'source',
      'city',
      'webSite',
      'hasContract',
      // 'description',
      // 'message',
      // 'interest',
      // 'preference',
      'howFound',
      'isRealClient',
      'payment'
    ];
  }
}
