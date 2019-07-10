/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, Input } from '@angular/core';
import { DnHttpService, IDictionary, isNullOrUndefined } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { DetayliBeyanBilgiModel } from '../../+model/detaylibeyan/detaylibeyan-bilgi.model';
import { DetayliBeyanKalemModel } from '../../+model/detaylibeyan/detaylibeyan-kalem.model';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  selector: 'detaylibeyan-ozet',
  template: `
    <table class="table table-bordered table-striped" *ngIf="detayliBeyan">
      <tbody>
      <tr>
        <th>Fatura</th>
        <td>{{getTutarValue(detayliBeyan.toplamFaturaBedeli, 'fatura') | number:'1.2-2'}}
          {{ getEnumId(detayliBeyan.toplamFaturaBedeliDoviz)}}
        </td>
      </tr>
      <tr>
        <th>Navlun</th>
        <td>{{getTutarValue(detayliBeyan.navlunBedeli, 'navlunBedeli') | number:'1.2-2'}}
          {{getEnumId(detayliBeyan.navlunBedeliDoviz)}}
        </td>
      </tr>
      <tr>
        <th>Sigorta</th>
        <td>{{getTutarValue(detayliBeyan.sigortaBedeli, 'sigortaBedeli') | number:'1.2-2'}}
          {{getEnumId(detayliBeyan.sigortaBedeliDoviz)}}
        </td>
      </tr>
      <tr>
        <th>Y. İçi</th>
        <td>{{getTutarValue(detayliBeyan.yurticiDiger) | number:'1.2-2'}} TL</td>
      </tr>
      <tr>
        <th>Y. Dışı</th>
        <td>{{detayliBeyan.yurtdisiDiger | number:'1.2-2'}}
          {{getEnumId(detayliBeyan.yurtdisiDigerDoviz)}}
        </td>
      </tr>
      </tbody>
    </table>`
})
export class DetaylibeyanOzetComponent {

  @Input() detayliBeyan: DetayliBeyanBilgiModel;
  @Input() kalemList: IDictionary;

  constructor(private dnHttp: DnHttpService<any>) {

  }

  private _idDetayliBeyan: number;

  get idDetayliBeyan(): number {
    return this._idDetayliBeyan;
  }

  @Input()
  set idDetayliBeyan(idDetayliBeyanData: number) {
    if (idDetayliBeyanData != this._idDetayliBeyan) {
      this.dnHttp.get('detaylibeyan/' + idDetayliBeyanData).subscribe(res => {
        if (res.isSuccess) {
          this.detayliBeyan = res.data as any;
        }
      });
    }
    this._idDetayliBeyan = idDetayliBeyanData;
  }

  getEnumId(enumData: any) {
    return isNullOrUndefined(enumData) ? '' : enumData.id;
  }


  getTutarValue(val: number, key) {
    if (isNullOrUndefined(this.kalemList)) {
      return val;
    }
    let total = 0;
    for (let i = 0; i < this.kalemList.keys().length; i++) {
      const kalem: DetayliBeyanKalemModel = this.kalemList.get(this.kalemList.keys()[i]);
      let kalemValue = kalem[key];
      if (key == 'yici') {
        kalemValue = this.getYurticiToplam(kalem);
      }
      if (!isNaN(kalemValue)) {
        total += +(kalemValue);
      }
    }
    return +(+(val) - total).toFixed(2);


  }

  refresh() {
  }

  private getYurticiToplam(kalem: DetayliBeyanKalemModel) {
    let total = 0;
    if (!isNaN(kalem.yurticiKkdf)) total += +(kalem.yurticiKkdf);
    if (!isNaN(kalem.yurticiTahmilTahliyeGider)) total += +(kalem.yurticiTahmilTahliyeGider);
    if (!isNaN(kalem.yurticiBankaMasraflari)) total += +(kalem.yurticiBankaMasraflari);
    if (!isNaN(kalem.yurticiCevreKatkiPayi)) total += +(kalem.yurticiCevreKatkiPayi);
    if (!isNaN(kalem.yurticiDepolamaGiderleri)) total += +(kalem.yurticiDepolamaGiderleri);
    if (!isNaN(kalem.yurticiKulturBakanligiKesinti)) total += +(kalem.yurticiKulturBakanligiKesinti);
    if (!isNaN(kalem.yurticiLimanGiderleri)) total += +(kalem.yurticiLimanGiderleri);
    return total;
  }
}
