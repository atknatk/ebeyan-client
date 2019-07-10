import { Component, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { BaseDetayliBeyanList } from '../abstracts/base-list';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  templateUrl: './tcgb-acma.component.html',
  styleUrls: ['./tcgb-acma.component.css']
})
export class DetaylibeyanTcgbAcmaComponent extends BaseDetayliBeyanList {
  @ViewChildren('date') dates;
  gtbConst2 = gtbConst;

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('tcgbAcmaKapatmaList', 'TcgbAcmaKapatma', activatedRoute, dnHttpService);
    // this.initDateMask();

  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  addRow(): FormGroup {
    return super.addRow();
    // this.initDateMask();
  }

  fields(): any[] {
    return [
      {key: 'kapatilanBeyannameNo'},
      {key: 'kapatilanKalemNo'},
      {key: 'kapatilanMiktar'},
      {key: 'aciklama'},
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'id', value: 0}
    ];
  }

  onSubmit() {
    this.saveList();
  }

  rowValueChangeEvent(fg: FormGroup): void {
  }

  /* private initDateMask() {
     let im = new Inputmask({
       alias: 'dd/mm/yyyy',
       showMaskOnHover: false
     });
     setTimeout(() => {
       this.dates.forEach(el => {
         im.mask(el.nativeElement);
       });
     }, 1000);
   }*/

}

