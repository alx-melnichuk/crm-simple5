import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ClientDto } from '../../lib-client/_interfaces/client-dto.interface';

@Component({
  selector: 'app-c-view',
  templateUrl: './c-view.component.html',
  styleUrls: ['./c-view.component.scss']
})
export class CViewComponent implements OnInit, OnChanges {

  @Input()
  public client: ClientDto;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.client != null && this.client == null) {
      this.client = ({} as ClientDto);
    }
  }
}
