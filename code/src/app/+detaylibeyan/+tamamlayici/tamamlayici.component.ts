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
  templateUrl: './tamamlayici.component.html',
  styleUrls: ['./tamamlayici.component.css']
})
export class DetaylibeyanTamamlayiciComponent extends BaseDetayliBeyanList {
  gtbConst2 = gtbConst;

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('detayliBeyanTamamlayiciList', 'detayliBeyanTamamlayici', activatedRoute, dnHttpService);
  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  fields(): any[] {
    return [
      {key: 'tamamlayiciBilgiKod'},
      {key: 'tamamlayiciBilgiOrani'},
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'id', value: 0}
    ];
  }

  onSubmit() {
    this.saveList();
  }

  rowValueChangeEvent(fg: FormGroup): void {
  }

}

