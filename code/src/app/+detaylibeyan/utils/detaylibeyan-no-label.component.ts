/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DnHttpService, isNullOrUndefined } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  selector: 'detaylibeyan-no-label',
  template: ` <label *ngIf="detayliBeyanNo !== undefined && detayliBeyanNo != ''" class='form-control dn-db-header'>
    <ng-content></ng-content>
    Detaylı Beyan Ref ID: <b><i>{{detayliBeyanNo}}</i></b></label>`,
  styles: ['.dn-db-header {  border-color: #45474b!important;background: #4c4f53!important;color: #fff!important; }']
})
export class DetaylibeyanNoLabelComponent implements OnInit {


  detayliBeyanNo: any = '';
  @Input() idDetayliBeyan: number;


  constructor(private dnHttp: DnHttpService<any>) {
  }


  ngOnInit() {
    this.initSimpleDetayliBeyan();
  }


  private initSimpleDetayliBeyan() {
    if (isNullOrUndefined(this.idDetayliBeyan)) return;
    this.dnHttp.get('Detaylibeyan/Simple/' + this.idDetayliBeyan).subscribe(res => {
      if (res.isSuccess) {
        this.detayliBeyanNo = res.data['refId'];
      }
    });
  }
}
