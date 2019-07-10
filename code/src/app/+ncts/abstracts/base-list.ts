import { Provider, ReflectiveInjector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnNotificationService, isNullOrUndefined } from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';

/**
 * Created by Cabbar on 13.06.2017.
 */

export abstract class BaseNctsList {
  public baseForm: FormGroup;
  protected notificationService: DnNotificationService;
  protected idNctsBeyan: number;
  protected restUrl: string;
  protected _fb: FormBuilder;
  protected gtbConst = gtbConst;
  protected defaultValue;

  constructor(protected formArrName: string, protected _restUrl: string, protected route: ActivatedRoute, protected dnHttp: DnHttpService<any>) {
    this._fb = this.getInjectableService(FormBuilder);
    let group = {};
    group[this.formArrName] = this._fb.array([]);
    this.baseForm = this._fb.group(this.initFormGroup());
    this.baseForm.addControl(this.formArrName, new FormArray([]));
    this.restUrl = _restUrl;
    this.notificationService = this.getInjectableService(DnNotificationService);
    this.initDetayliBeyanId();
  }

  addRow() {
    this.getControl().push(this.initRowData());
  }

  addSatir(data?): void {
    this.getControl().push(this.initRowData(data));
  }

  edit(data) {
    this.dnHttp.put(data, this.restUrl).subscribe(res => {
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

  initFormGroup(): any {
    let group = {};
    this.fields().forEach(item => {
      if (isNullOrUndefined(item.value)) {
        group[item.key] = [null];
      } else {
        group[item.key] = [item.value];
      }
    });
    return group;
  };

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
    this.dnHttp.get('nctsbeyan/' + this.idNctsBeyan + '/' + this._restUrl).subscribe(res => {
      if (res.isSuccess) {
        this.removeAllFromForm();
        res.data.forEach(data => {
          this.getControl().push(this.initRowData(data));
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
    this.resetForm();
  }

  resetForm() {
    this.baseForm.patchValue(this.defaultValue);
  }

  save(data?: any, extra?: any) {
    if (isNullOrUndefined(data)) {
      data = this.getValue();
    }
    return this.dnHttp.post(data, this.restUrl)
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
    this.dnHttp.post(data, this.restUrl + '/List')
      .subscribe(res => {
        if (res.isSuccess) {
          this.loadData();
        }
        this.notificationService.showDinazorResultMessage(res);
      });
  }

  setNctsBeyanId(id: number): void {
    this.idNctsBeyan = id;
  }

  private getEnumValue(val) {
    if (val) {
      if (isNullOrUndefined(val)) {
        return '';
      } else {
        return val['name'];
      }
    }
    return '';
  }

  private getInjectableService(provider: Provider): any {
    return ReflectiveInjector.resolveAndCreate([provider]).get(provider);
  }

  private initDetayliBeyanId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idNctsBeyan = +params['idNctsBeyan'] || NaN;
        this.loadData();
      });
  }

  private removeData(i: number, extra?: any) {
    let val = this.getValue(i);
    if (val && val.id) {
      this.notificationService.removeConfirm(() => {
        return this.dnHttp.delete(this.restUrl, val.id);
      }, this.removeSuccessCb.bind(this), i, extra);
    } else {
      this.getControl().removeAt(i);
    }
  }

}
