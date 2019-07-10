/**
 * Created by Cabbar on 13.06.2017.
 */

import { Provider, ReflectiveInjector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnLoadingBase, DnNotificationService, isNullOrUndefined } from '@dinazor/core';

export abstract class BaseDetayliBeyanList extends DnLoadingBase {
  public baseForm: FormGroup;
  displaySelectKalem = res => {
    if (isNullOrUndefined(res.entity['gtip'])) {
      return res.entity['kalemNo'];
    } else {
      return res.entity['kalemNo'] + ' - ' + res.entity['gtip'];
    }
  }
  selectedTextKalem = res => {
    if (isNullOrUndefined(res.entity['gtip'])) {
      return res.entity['kalemNo'];
    } else {
      return res.entity['kalemNo'] + ' - ' + res.entity['gtip'];
    }
  }
  protected notificationService: DnNotificationService;
  protected idDetayliBeyan: number;
  protected restUrl: string;
  protected _fb: FormBuilder;

  constructor(protected formArrName: string, protected _restUrl: string, protected route: ActivatedRoute, protected dnHttp: DnHttpService<any>) {
    super();
    this._fb = this.getInjectableService(FormBuilder);
    let group = {};
    group[this.formArrName] = this._fb.array([]);
    this.baseForm = this._fb.group(group);
    this.restUrl = _restUrl;
    this.notificationService = this.getInjectableService(DnNotificationService);
    this.initDetayliBeyanId();
  }

  addRow(): FormGroup {
    const row: FormGroup = this.initRowData();
    this.rowValueChangeEvent(row);
    this.getControl().push(row);
    return row;
  }

  addSatir(data?): FormGroup {
    const row: FormGroup = this.initRowData();
    this.rowValueChangeEvent(row);
    row.setValue(data);
    this.getControl().push(row);
    return row;
  }

  edit(data) {
    this.dnHttp.put(data, this.restUrl, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.loadData();
      }
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  abstract fields(): any[];

  getControl(): FormArray {
    return <FormArray>this.baseForm.controls[this.formArrName];
  }

  getValue(i?: number): any {
    if (!isNullOrUndefined(i)) {
      return this.getControl().value[i];
    }
    return this.getControl().value;
  }

  initRowData(data?: any): FormGroup {
    let group = {};
    if (data) {
      this.fields().forEach(item => {
        group[item.key] = [data[item.key]];
      });
    } else {
      this.fields().forEach(item => {
        if (isNullOrUndefined(item.value)) {
          group[item.key] = [null];
        } else {
          group[item.key] = [item.value];
        }
      });
    }
    return this._fb.group(group);
  };

  loadData() {
    this.loading = true;
    this.dnHttp.get('detaylibeyan/' + this.idDetayliBeyan + '/' + this._restUrl, this.loadingContext()).subscribe(res => {
      this.loading = false;
      if (res.isSuccess) {
        this.removeAllFromForm();
        res.data.forEach(data => {
          this.addSatir(data);
//          this.getControl().push(this.initRowData(data));
        });
      } else {
        this.notificationService.showDinazorResultMessage(res);
      }
    });
  }

  removeAllFromForm() {
    let size = this.getControl().length;
    for (let i = 0; i < size; i++) {
      this.getControl().removeAt(0);
    }
  }

  removeRow(i: number, extra?: any) {
    this.removeData(i, extra);
  }

  removeSuccessCb(i: number, extra?: any): void {
    this.getControl().removeAt(i);
    if (extra && extra.hasOwnProperty('successCb')) {
      extra.successCb();
    }
  }

  reset() {
    this.fields().forEach(field => {
      let fieldForm: FormGroup = <FormGroup>this.baseForm.get(field.key);
      if (fieldForm) {
        fieldForm.reset();
      }
    });
  }

  abstract rowValueChangeEvent(fg: FormGroup): void;

  save(data?: any, extra?: any) {
    if (isNullOrUndefined(data)) {
      data = this.getValue();
    }
    return this.dnHttp.post(data, this.restUrl, this.loadingContext())
      .subscribe(res => {
        if (res.isSuccess) {
          this.loadData();
          if (extra.hasOwnProperty('reset') && extra.reset) {
            this.reset();
          }
        }
        this.notificationService.showDinazorResultMessage(res);
      })
      ;
  }

  saveList(data?: any) {
    if (isNullOrUndefined(data)) {
      data = this.getValue();
    }
    this.dnHttp.post(data, this.restUrl + '/List', this.loadingContext())
      .subscribe(res => {
        if (res.isSuccess) {
          this.loadData();
        }
        this.notificationService.showDinazorResultMessage(res);
      });
  }

  setDetayliBeyanId(id: number): void {
    this.idDetayliBeyan = id;
  }

  private getInjectableService(provider: Provider): any {
    return ReflectiveInjector.resolveAndCreate([provider]).get(provider);
  }

  private initDetayliBeyanId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        this.loadData();
      });
  }

  private removeData(i: number, extra?: any) {
    let val = this.getValue(i);
    if (val && val.id) {
      this.notificationService.removeConfirm(() => this.dnHttp.delete(this.restUrl, val.id)
        , this.removeSuccessCb.bind(this), i, extra);
    } else {
      this.getControl().removeAt(i);
    }
  }


}
