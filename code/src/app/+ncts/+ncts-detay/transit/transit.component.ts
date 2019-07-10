/**
 * Created by cabbar on 03.05.2017.
 */
import { Component } from '@angular/core';
import { BaseNctsList } from '../../abstracts/base-list';
import { ActivatedRoute } from '@angular/router';
import { deepCopy, DnHttpService } from '@dinazor/core';


@Component({
  selector: 'ncts-detay-transit',
  templateUrl: './transit.component.html',
  styleUrls: ['./transit.component.css']
})
export class NctsDetayTransitComponent extends BaseNctsList {

  selectedRow: number = NaN;

  get isEdit() {
    return !isNaN(this.selectedRow);
  }

  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('NctsTransitGumrukList', 'NctsTransitGumruk', activatedRoute, dnHttpService);
  }

  fields(): any[] {
    return [
      {key: 'transitGumrukIdaresi'},
      {key: 'varisTarihSaat'},
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
