/**
 * Created by cabbar on 03.05.2017.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deepCopy, DnHttpService } from '@dinazor/core';
import { BaseNctsKalemList } from '../../../abstracts/base-kalem-list';

@Component({
  selector: 'ncts-kalem-detay-ek-bilgi',
  templateUrl: './ek-bilgi.component.html',
  styleUrls: ['./ek-bilgi.component.css']
})
export class NctsKalemDetayEkBilgiComponent extends BaseNctsKalemList {


  selectedRow: number = NaN;

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('NctsKalemEkBilgiList', 'NctsKalemEkBilgi', activatedRoute, dnHttpService);
  }

  get isEdit() {
    return !isNaN(this.selectedRow);
  }

  fields(): any[] {
    return [
      {key: 'ozelAciklama'},
      {key: 'dil'},
      {key: 'ekBilgiKodu'},
      {key: 'ulke'},
      {key: 'id', value: 0},
      {key: 'idNctsKalem', value: this.idNctsKalem}
    ];
  }

  ngAfterViewInit(): void {
    this.baseForm.patchValue({idNctsKalem: this.idNctsKalem});
    this.defaultValue = this.baseForm.getRawValue();
  }

  onRemove(i: number): void {
    this.removeRow(i, {
      successCb: this.resetTable.bind(this)
    });
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

  setClickedRow(index) {
    if (this.selectedRow == index) {
      this.resetTable();
    } else {
      this.selectedRow = index;
      this.loadRowValueToForm(index);
    }
  }

  setNctsKalemId(id: number) {
    this.resetTable();
    this.idNctsKalem = id;
    super.setNctsKalemId(id);
  }

  private loadRowValueToForm(i: number): void {
    let val = this.getValue(i);
    this.baseForm.patchValue(val);
  }

  private resetTable() {
    this.selectedRow = NaN;
    this.reset();
  }

}
