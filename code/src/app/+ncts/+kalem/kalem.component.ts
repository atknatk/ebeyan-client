/**
 * Created by cabbar on 04.05.2017.
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService } from '@dinazor/core';
import { BaseInputList } from '../../gtb/shared/input-list.base';
import { KalemFinansalTabComponent } from './finansal-tab/finansal-tab.component';
import { NctsKalemDetayEkBilgiComponent } from './kalem-detay/ek-bilgi/ek-bilgi.component';
import { NctsKalemDetayHassasEsyaComponent } from './kalem-detay/hassas-esya/hassas-esya.component';
import { NctsKalemDetayKapComponent } from './kalem-detay/kap/kap.component';
import { NctsKalemDetayKonteynerComponent } from './kalem-detay/konteyner/konteyner.component';
import { NctsKalemDetayOncekiBelgeComponent } from './kalem-detay/onceki-belge/onceki-belge.component';
import { NctsKalemDetaySunulanBelgeComponent } from './kalem-detay/sunulan-belge/sunulan-belge.component';

declare let $: any;

@Component({
  templateUrl: './kalem.component.html',
  styleUrls: ['./kalem.component.css']
})
export class NctsKalemComponent extends BaseInputList implements AfterViewInit {
  isKalemDetay: boolean = false;
  @ViewChild('kap') kapComponent: NctsKalemDetayKapComponent;
  @ViewChild('konteyner') konteynerComponent: NctsKalemDetayKonteynerComponent;
  @ViewChild('ekBilgi') ekBilgiComponent: NctsKalemDetayEkBilgiComponent;
  @ViewChild('hassasEsya') hassasEsyaComponent: NctsKalemDetayHassasEsyaComponent;
  @ViewChild('oncekiBelge') oncekiBelgeComponent: NctsKalemDetayOncekiBelgeComponent;
  @ViewChild('sunulanBelge') sunulanBelgeComponent: NctsKalemDetaySunulanBelgeComponent;

  constructor(protected route: ActivatedRoute,
              protected dnHttp: DnHttpService<any>) {
    super('NctsBeyan', 'idNctsBeyan', 'NctsKalem', 'kalemNo', route, dnHttp);
  }

  get idNctsKalem() {
    return this.baseForm.value.id;
  }

  get isShowDetay(): boolean {
    return this.isKalemDetay && this.isEdit;

  }

  afterLoadInitializedData(data: any): void {
    this.prepareDetayIds(data.id);
  }

  afterOnSaveOrUpdate(data: any): void {
    this.prepareDetayIds(data.id);
  }

  fields(): any[] {
    return [
      {key: 'id', value: 0},
      {key: 'idNctsBeyan', value: 0},
    ];
  }

  getValueFromLeftList(uniqueId: any) {
    this.getValue(uniqueId);
    this.prepareDetayIds(this.dataList.get(uniqueId).id);
  }

  kalemClick(): void {
    this.isKalemDetay = false;
  }

  kalemDetayClick(): void {
    this.prepareDetayIds(this.baseForm.getRawValue().id);
    this.isKalemDetay = true;
  }

  ngAfterViewInit(): void {
    this.afterInit();
  }

  prepareDetayIds(id: any) {
    if (this.kapComponent) {
      this.kapComponent.setNctsKalemId(id);
    }
    if (this.konteynerComponent) {
      this.konteynerComponent.setNctsKalemId(id);
      this.ekBilgiComponent.setNctsKalemId(id);
      this.hassasEsyaComponent.setNctsKalemId(id);
      this.oncekiBelgeComponent.setNctsKalemId(id);
      this.sunulanBelgeComponent.setNctsKalemId(id);
    }
  }
}
