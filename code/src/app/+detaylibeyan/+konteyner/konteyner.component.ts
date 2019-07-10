/**
 * Created by cabbar on 03.05.2017.
 */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { BaseDetayliBeyanList } from '../abstracts/base-list';
import { GtbSelectItem } from '../model/gtb-select-item-base';


@Component({
  templateUrl: './konteyner.component.html',
  styleUrls: ['./konteyner.component.css']
})
export class DetaylibeyanKonteynerComponent extends BaseDetayliBeyanList {
  gtbConst = gtbConst;

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('detayliBeyanKonteynerList', 'detayliBeyanKonteyner', activatedRoute, dnHttpService);
  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  fields(): any[] {
    return [
      {key: 'konteynerNo'},
      {key: 'ulke'},
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'id', value: 0}
    ];
  }

  onSubmit() {
    return this.dnHttp.post(this.getValue(), this.restUrl + '/List')
      .subscribe(this.notificationService.subscribeMessage.bind(this.notificationService));
  }

  rowValueChangeEvent(fg: FormGroup): void {
  }

}

