/**
 * Created by cabbar on 04.05.2017.
 */
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnInputComponent, isNullOrUndefined } from '@dinazor/core';
import { BaseInputList } from '../../../gtb/shared/input-list.base';

declare let $: any;

@Component({
  selector: 'db-kiymet-kalem',
  templateUrl: './kiymet-kalem.component.html',
  styleUrls: ['./kiymet-kalem.component.css']
})
export class DetaylibeyanKiymetKalemComponent extends BaseInputList implements AfterViewInit {
  @ViewChild('toplamb') private toplamB: DnInputComponent;
  @ViewChild('toplamc') private toplamC: DnInputComponent;
  @ViewChild('toplamgenel') private toplamGenel: DnInputComponent;
  private isFirstClick = true;

  constructor(protected route: ActivatedRoute,
              protected dnHttp: DnHttpService<any>) {
    super('DetaylibeyanKiymet', 'idDetayliBeyanKiymet', 'DetaylibeyanKiymetKalem', 'beyannemeKalemNo', route, dnHttp, {
      routeData: false,
      baseUrl: 'DetaylibeyanKiymet'
    });
  }

  afterLoadInitializedData(data: any): void {
  }

  afterOnSaveOrUpdate(data: any): void {
  }

  fields(): any[] {
    return [
      {key: 'id', value: 0},
      {key: 'idDetayliBeyanKiymet', value: this.idData},
      {key: 'kiymetNo', value: 1}
    ];
  }

  getKiymetKalem(uniqueNo) {
    this.hesaplaToplam(this.getValue(uniqueNo));
  }

  initialize(): void {
    this.initData();
    if (this.isFirstClick) {
      this.uniqueChanges();
      this.isFirstClick = false;
    }

  }

  ngAfterViewInit(): void {
    // this.afterInit();
    this.defaultValues = this.baseForm.getRawValue();
    this.formValueChangesHesaplama();
  }

  setIdDetayliBeyanKiymet(id: any) {
    this.baseForm.patchValue({'idDetayliBeyanKiymet': id});
    this.idData = id;
  }

  private formValueChangesHesaplama() {
    this.baseForm.valueChanges.subscribe(data => {
      this.hesaplaToplam(data);
    });
  }

  private getNumberValue(data: any): number {
    if (isNullOrUndefined(data)) return 0;
    return +data;
  }

  private hesaplaToplam(data: any): void {
    if (isNullOrUndefined(this.toplamB) ||
      isNullOrUndefined(this.toplamC) ||
      isNullOrUndefined(this.toplamGenel)) return;
    let toplamBValue = 0;
    toplamBValue += this.getNumberValue(data.komisyon);
    toplamBValue += this.getNumberValue(data.ithalaKatilanMalzeme);
    toplamBValue += this.getNumberValue(data.tellaliye);
    toplamBValue += this.getNumberValue(data.ithalaUretimAraclar);
    toplamBValue += this.getNumberValue(data.kapAmbalajBedeli);
    toplamBValue += this.getNumberValue(data.ithalaUretimTuketimMalzemesi);
    toplamBValue += this.getNumberValue(data.royaltiLisans);
    toplamBValue += this.getNumberValue(data.planTaslak);
    toplamBValue += this.getNumberValue(data.dolayliIntikal);
    toplamBValue += this.getNumberValue(data.sigorta);
    toplamBValue += this.getNumberValue(data.nakliye);
    this.toplamB.value = toplamBValue;

    let toplamCValue = 0;
    toplamCValue += this.getNumberValue(data.girisSonrasiNakliye);
    toplamCValue += this.getNumberValue(data.teknikYardim);
    toplamCValue += this.getNumberValue(data.digerOdemeler);
    toplamCValue += this.getNumberValue(data.vergiHarcFon);
    toplamCValue += this.getNumberValue(data.digerOdemelerNiteligi);
    this.toplamC.value = toplamCValue;

    this.toplamGenel.value = this.getNumberValue(data.dolayliOdeme) + toplamBValue + toplamCValue;

  }

}
