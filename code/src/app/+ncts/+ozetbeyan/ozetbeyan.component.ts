/**
 * Created by cabbar on 03.05.2017.
 */
import { AfterViewInit, Component } from '@angular/core';
import { GtbSelectItem } from '../model/gtb-select-item-base';
import { ActivatedRoute } from '@angular/router';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { BaseNctsList } from '../abstracts/base-list';
import { deepCopy, DnHttpService } from '@dinazor/core';


@Component({
  templateUrl: './ozetbeyan.component.html',
  styleUrls: ['./ozetbeyan.component.css']
})
export class NctsOzetbeyanComponent extends BaseNctsList implements AfterViewInit {


  selectedRow: number = NaN;

  get isEdit() {
    return !isNaN(this.selectedRow);
  }

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('NctsOzetBeyanAcmaList', 'NctsOzetBeyanAcma', activatedRoute, dnHttpService);
  }

  fields(): any[] {
    return [
      {key: 'ozetBeyanAcmaSekli'},
      {key: 'isEsyaAmbarda'},
      {key: 'ozetBeyanNumarasi'},
      {key: 'tasimaSatiriNo'},
      {key: 'ambarKodu'},
      {key: 'tasimaSenediNumarasi'},
      {key: 'acilacakKapSayisi'},
      {key: 'id', value: 0},
      {key: 'idNctsBeyan', value: this.idNctsBeyan}
    ];
  }

  onSubmit() {
    if (this.isEdit) {
      let val = deepCopy(this.baseForm.getRawValue());
      delete val[this.formArrName];
      this.edit(val);
    } else {
      let val = deepCopy(this.baseForm.getRawValue());
      delete val[this.formArrName];
      this.save(val, {reset: true});
    }

  }

  onRemove(i: number): void {
    this.removeRow(i, {
      successCb: this.resetTable.bind(this)
    });
  }


  setClickedRow(index) {
    if (this.selectedRow == index) {
      this.resetTable();
    } else {
      this.selectedRow = index;
      this.loadRowValueToForm(index);
    }
  }

  ngAfterViewInit(): void {
    this.baseForm.patchValue({idNctsBeyan: this.idNctsBeyan});
    this.defaultValue = this.baseForm.getRawValue();
  }

  private resetTable() {
    this.selectedRow = NaN;
    this.reset();
  }


  private loadRowValueToForm(i: number): void {
    let val = this.getValue(i);
    this.baseForm.patchValue(val);
  }

}
