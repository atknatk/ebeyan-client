/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, Input, OnInit } from '@angular/core';
import { GtbSelectItem } from '../model/gtb-select-item-base';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { DnHttpService, isNullOrUndefinedOrNaN } from '@dinazor/core';
declare let $: any;


@Component({
  selector: 'ncts-no-label',
  template: ` <label *ngIf="refId !== undefined && nctsNo != ''" class='form-control dn-db-header'>Ncts
    Ref ID: <b><i>{{refId}} &nbsp;</i></b></label>`,
  styles: ['.dn-db-header {  border-color: #45474b!important;background: #4c4f53!important;color: #fff!important; }']
})
export class NctsNoLabelComponent implements OnInit {


  @Input() idNcts: number;
  @Input() refId: string;


  constructor(private dnHttp: DnHttpService<any>) {
  }


  ngOnInit() {
    this.initSimpleDetayliBeyan();
  }


  private initSimpleDetayliBeyan() {
    if (isNullOrUndefinedOrNaN(this.idNcts)) return;
    this.dnHttp.get('Nctsbeyan/Simple/' + this.idNcts).subscribe(res => {
      if (res.isSuccess) {
        this.refId = res.data['refId'];
      }
    });
  }
}
