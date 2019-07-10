/**
 * Created by cabbar on 03.05.2017.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { deepCopy, DnHttpService, isNullOrUndefined } from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';
import { BaseDetayliBeyanList } from '../abstracts/base-list';


@Component({
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.css']
})
export class DetaylibeyanMarkaComponent extends BaseDetayliBeyanList {
  gtbConst = gtbConst;
  selectedRow: number = NaN;

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('detayliBeyanMarkaList', 'detayliBeyanMarka', activatedRoute, dnHttpService);
    this.baseForm.addControl('id', new FormControl(0));
  }

  get isEdit() {
    return !isNaN(this.selectedRow);
  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  fields(): any[] {
    return [
      {key: 'markaTuru'},
      {key: 'markaTescilNo'},
      {key: 'markaAdi'},
      {key: 'markaKiymeti'},
      {key: 'referansNo'},
      {key: 'modelYili'},
      {key: 'model'},
      {key: 'motorHacmi'},
      {key: 'silindirAdedi'},
      {key: 'renk'},
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'id', value: 0}
    ];
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

  rowValueChangeEvent(fg: FormGroup): void {
  }

  setClickedRow(index) {
    if (this.selectedRow == index) {
      this.resetTable();
    } else {
      this.selectedRow = index;
      this.loadRowValueToForm(index);
    }
  }

  private getKalemValue(val) {
    if (val) {
      if (isNullOrUndefined(val['gtip'])) {
        return val['kalemNo'];
      } else {
        return val['kalemNo'] + ' - ' + val['gtip'];
      }
    }
    return '';
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

