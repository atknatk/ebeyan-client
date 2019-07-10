/**
 * Created by Cabbar on 12.07.2017.
 */


import { Provider, ReflectiveInjector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  deepCopy,
  Dictionary,
  DnHttpService,
  DnInputComponent,
  DnLoadingBase,
  DnNotificationService,
  IDictionary,
  isNullOrUndefined
} from '@dinazor/core';
import { gtbConst } from '../gtb-const';

export abstract class BaseInputList extends DnLoadingBase {
  public baseForm: FormGroup;
  defaultValues;
  dirtyList: IDictionary = new Dictionary();
  dataList: IDictionary = new Dictionary();
  gtbConst = gtbConst;
  protected notificationService: DnNotificationService;
  protected idData: number;
  protected uniqueName: string;
  protected restUrl: string;
  protected _fb: FormBuilder;
  private lastChangedData: any;
  @ViewChild('uniquieinput') private uniquieInput: DnInputComponent;

  constructor(protected beyanName: string,
              protected paramIdName: string,
              protected _restUrl: string,
              protected _uniqueName: string,
              protected route: ActivatedRoute,
              protected dnHttp: DnHttpService<any>,
              protected params?: any) {
    super();
    this._fb = this.getInjectableService(FormBuilder);

    this.uniqueName = _uniqueName;
    this.restUrl = _restUrl;
    this.notificationService = this.getInjectableService(DnNotificationService);
    this.getId();
  }

  get id(): number {
    return this.baseForm.get('id').value;
  }

  get isEdit(): boolean {
    return this.id != 0;
  }

  get uniqueNo(): string {
    return this.baseForm.get(this.uniqueName).value;
  }

  set uniqueNo(val: string) {
    let formVal = {};
    formVal[this.uniqueName] = val;
    this.baseForm.patchValue(formVal);
  }

  abstract afterLoadInitializedData(data: any): void;

  abstract afterOnSaveOrUpdate(data: any): void;

  abstract fields(): any[];

  getValue(uniqueNo): any {
    let value = this.dataList.get(uniqueNo);
    this.resetForm();
    this.patchForm(value);
    return value;
  }

  initForm() {
    let group = {};
    this.fields().forEach(item => {
      if (isNullOrUndefined(item.value)) {
        group[item.key] = [null];
      } else {
        group[item.key] = [item.value];
      }
    });
    this.baseForm = this._fb.group(group);
  };

  isEditting(uniqueNo) {
    let editting = this.dirtyList.get(uniqueNo);
    return isNullOrUndefined(editting) ? false : editting;
  }

  onDelete() {
    this.deleteData();
  }

  onSubmit() {
    if (this.isEdit) {
      this.updateData();
    } else {
      this.saveData();
    }
  }

  protected afterInit() {
    this.initTemporaryTescilNoOrBeyanData();
    this.uniqueChanges();
  }

  protected deleteData() {
    this.notificationService.removeConfirm(() => {
      return this.dnHttp.delete(this.restUrl,this.id);
    }, this.initData.bind(this));
  }

  protected initData() {
    if (isNullOrUndefined(this.idData)) return;
    this.baseForm.patchValue({'idDetayliBeyan': this.idData});
    this.dnHttp.get(this.beyanName + '/' + this.idData + '/' + this.restUrl, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.loadDataList(res.data);
      }
    });
  }

  protected patchForm(value) {
    setTimeout(() => this.baseForm.patchValue(value, {emitEvent: false}), 0);
  }

  protected resetForm() {
    setTimeout(() => this.baseForm.reset(this.defaultValues, {emitEvent: false}), 0);
  }

  protected saveData() {
    let val = this.baseForm.getRawValue();
    this.dnHttp.post(val, this.restUrl, this.loadingContext()).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
      if (res.isSuccess)
        this.satirEkle();
      let data = this.dataList.get(val[this.uniqueName]);
      data.id = res.objectId;
      this.dataList.addOrUpdate(val[this.uniqueName], data);
      this.patchForm(data);
      this.dirtyList.addOrUpdate(this.uniqueNo, false);
      this.afterOnSaveOrUpdate(data);
    });
  }

  protected uniqueChanges() {
    this.baseForm.get(this.uniqueName).valueChanges.subscribe(uniqueNo => {
      if (isNullOrUndefined(uniqueNo)) return;
      let selectKalem = this.dataList.get(uniqueNo);
      if (selectKalem) {
        let cloned = deepCopy(selectKalem);
        delete cloned[this.uniqueName];
        this.patchForm(cloned);
      } else {
        let cloned = deepCopy(this.defaultValues);
        delete cloned[this.uniqueName];
        this.patchForm(cloned);
      }
    });

  }

  protected updateData() {
    this.dnHttp.put(this.baseForm.getRawValue(), this.restUrl, this.loadingContext())
      .subscribe(res => {
        this.notificationService.showDinazorResultMessage(res);
        if (res.isSuccess) {
          this.dirtyList.addOrUpdate(this.uniqueNo, false);
        }
        this.afterOnSaveOrUpdate(this.dataList.get(this.uniqueNo));
      });
  }

  private formValueChanges() {
    this.baseForm.valueChanges.subscribe((data) => {
      const isUniqueChanged = this.isUniqueChanged(data);
      let curKalemNo = data[this.uniqueName];
      if (isNullOrUndefined(curKalemNo)) {
        /*   if (!isUniqueChanged) {
         this.notificationService.showWarning('Önce kalem numarasını giriniz.');
         this.uniquieInput.nativeElement.focus();
         }*/
        return;
      }
      this.lastChangedData = data;
      if (!isUniqueChanged) {
        if (this.dataList.get(curKalemNo)) {
          this.dataList.addOrUpdate(curKalemNo, data);
          this.dirtyList.addOrUpdate(curKalemNo, true);
        }
      }
    });
  }

  private getId() {
    this.route
      .queryParams
      .subscribe(params => {
          for (let key in params) {
            if (params.hasOwnProperty(key)) {
              if (key.toLowerCase() == this.paramIdName.toLowerCase()) {
                this.idData = +params[key] || NaN;
              }
            }
          }
          this.initForm();
          this.formValueChanges();
        }
      );
  }

  private getInjectableService(provider: Provider): any {
    return ReflectiveInjector.resolveAndCreate([provider]).get(provider);
  }

  private getParams(key: string): any {
    if (isNullOrUndefined(this.params)) {
      return;
    }
    return this.params[key];
  }

  private initTemporaryTescilNoOrBeyanData() {

    if (!isNaN(this.idData)) {
      let obj = {};
      obj[this.paramIdName] = this.idData;
      this.baseForm.patchValue(obj);
      this.defaultValues = this.baseForm.getRawValue();
      this.initData();
    }
  }

  private isUniqueChanged(currData: any): boolean {
    if (isNullOrUndefined(this.lastChangedData) ||
      isNullOrUndefined(this.lastChangedData[this.uniqueName]) ||
      isNullOrUndefined(currData[this.uniqueName])
    ) return false;
    return currData[this.uniqueName] != this.lastChangedData[this.uniqueName];
  }

  private loadDataList(dtbyKalemList) {
    let that = this;
    if (dtbyKalemList && dtbyKalemList.length > 0) {
      dtbyKalemList = dtbyKalemList.sort(this.sortList.bind(this));
      that.dataList = new Dictionary();
      dtbyKalemList.forEach(data => {
        that.dataList.addOrUpdate(data[this.uniqueName], data);
      });
      let val = that.dataList.values()[0];
      this.patchForm(val);
      this.lastChangedData = val;
      this.afterLoadInitializedData(val);
    } else {
      this.resetForm();
    }
  }

  private satirEkle() {
    let val = this.baseForm.getRawValue();
    this.dataList.addOrUpdate(val[this.uniqueName], val);
    this.resetForm();
    this.patchForm(this.defaultValues);
  }

  private sortList(o1, o2): number {
    if (o1[this.uniqueName] > o2[this.uniqueName]) return 1;
    if (o1[this.uniqueName] < o2[this.uniqueName]) return -1;
    return 0;
  }

}
