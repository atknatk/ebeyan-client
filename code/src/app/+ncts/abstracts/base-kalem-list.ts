import { Input, Provider, ReflectiveInjector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnLoadingBase, DnNotificationService, isNullOrUndefined } from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';

/**
 * Created by Cabbar on 13.06.2017.
 */

export abstract class BaseNctsKalemList extends DnLoadingBase {
  public baseForm: FormGroup;
  protected notificationService: DnNotificationService;
  @Input() idNctsKalem: number;
  protected restUrl: string;
  protected _fb: FormBuilder;
  protected gtbConst = gtbConst;
  protected defaultValue;
  private lastKalemId;

  constructor(protected formArrName: string, protected _restUrl: string, protected route: ActivatedRoute, protected dnHttp: DnHttpService<any>) {
    super();
    this._fb = this.getInjectableService(FormBuilder);
    let group = {};
    group[this.formArrName] = this._fb.array([]);
    this.baseForm = this._fb.group(this.initFormGroup());
    this.baseForm.addControl(this.formArrName, new FormArray([]));
    this.restUrl = _restUrl;
    this.notificationService = this.getInjectableService(DnNotificationService);
    this.idKalemChange();
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
      } else {
        this.notificationService.showDinazorResultMessage(res);
      }
    });
  }

  abstract fields(): any[];

  getControl(): FormArray {
    return <FormArray>this.baseForm.controls[this.formArrName];
  }

  getEnumValue(val) {
    if (val) {
      if (isNullOrUndefined(val)) {
        return '';
      } else {
        return val['name'];
      }
    }
    return '';
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
    this.loading = true;
    this.dnHttp.get('NctsKalem/' + this.idNctsKalem + '/' + this._restUrl).subscribe(res => {
      this.loading = false;
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
        } else {
          this.notificationService.showDinazorResultMessage(res);
        }
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

  setNctsKalemId(id: number): void {
    this.idNctsKalem = id;
    this.defaultValue.idNctsKalem = id;
    this.reset();
    this.baseForm.patchValue({idNctsKalem: id});
  }

  setNctsKalemIdWithoutLoad(id: number): void {
    this.idNctsKalem = id;
    this.defaultValue.idNctsKalem = id;
    this.baseForm.patchValue({idNctsKalem: id});
    this.loadData();
  }

  private getInjectableService(provider: Provider): any {
    return ReflectiveInjector.resolveAndCreate([provider]).get(provider);
  }

  private idKalemChange() {
    this.baseForm.get('idNctsKalem').valueChanges.subscribe(res => {
      if (isNullOrUndefined(res) || res == '0') return;
      if (this.lastKalemId != res) {
        this.lastKalemId = res;
        this.loadData();
      }

    });
  }

  private removeData(i: number, extra?: any) {
    let val = this.getValue(i);
    if (val && val.id) {
      this.notificationService.removeConfirm(() => {
        return this.dnHttp.delete(val.id, this.restUrl);
      }, this.removeSuccessCb.bind(this), i, extra);
    } else {
      this.getControl().removeAt(i);
    }
  }

}
