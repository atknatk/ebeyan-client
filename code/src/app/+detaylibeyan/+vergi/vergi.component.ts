/**
 * Created by cabbar on 03.05.2017.
 */

import { AfterViewInit, Component, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnLoadingBase, DnNotificationService, DnSelect2Item } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import { isNullOrUndefined } from 'util';
import { gtbConst } from '../../gtb/gtb-const';
import { GtbSelectItem } from '../model/gtb-select-item-base';


@Component({
  templateUrl: './vergi.component.html',
  styleUrls: ['./vergi.component.css']
})
export class DetaylibeyanVergiComponent extends DnLoadingBase implements AfterViewInit {


  gtbConst = gtbConst;
  formArrName = 'detayliBeyanVergiList';
  restUrl = 'detayliBeyanVergi';
  baseForm: FormGroup;
  idDetayliBeyan: number;
  idDetayliBeyanKalem: number;
  selectedVergiArray = [];
  displaySelectKalem = res => {
    if (isNullOrUndefined(res.entity['gtip'])) {
      return res.entity['kalemNo'];
    } else {
      return res.entity['kalemNo'] + ' - ' + res.entity['gtip'];
    }
  };
  selectedTextKalem = res => {
    if (isNullOrUndefined(res.entity['gtip'])) {
      return res.entity['kalemNo'];
    } else {
      return res.entity['kalemNo'] + ' - ' + res.entity['gtip'];
    }
  };
  @ViewChildren('curr') private curr;

  constructor(private dnHttp: DnHttpService<any>,
              private route: ActivatedRoute,
              private _fb: FormBuilder,
              private notificationService: DnNotificationService) {
    super();
    this.extendMask();
    let group = {
      vergiUser: this._fb.array([]),
      vergiGumruk: this._fb.array([]),
    };
    this.baseForm = this._fb.group(group);
    this.baseForm.addControl('idDetayliBeyanKalem', new FormControl(0));
    this.initDetayliBeyanId();
  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  addRow() {
    this.getUserControl().push(this.initRowData());
  }

  addThisVergiToArray(vergi: any, event) {
    if (!event.ctrlKey) {
      this.selectedVergiArray = [];
    }

    this.toggleItemInArr(this.selectedVergiArray, vergi);
  }

  addUserSatir(data?): void {
    this.getUserControl().push(this.initRowData(data));
    this.initCurrMask();
  }

  allRowMove() {
    const that = this;
    const arr = this.getGumrukControl().value;
    arr.forEach(item => {
      item.isGumruk = false;
      item.id = 0;
      that.getUserControl().push(this.initRowData(item));
      this.initCurrMask();
    });
  }

  edit(data) {
    this.dnHttp.put(data, this.restUrl, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.loadDataUser(this.idDetayliBeyanKalem);
      }
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  fields(): any[] {
    return [
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'kod'},
      {key: 'aciklama'},
      {key: 'miktar'},
      {key: 'oran'},
      {key: 'vergiOdemeSekil'},
      {key: 'vergiMatrahi'},
      {key: 'id', value: 0}
    ];
  }

  getControl(prop: string): FormArray {
    return <FormArray>this.baseForm.controls[prop];
  }

  getGumrukControl(): FormArray {
    return <FormArray>this.baseForm.controls['vergiGumruk'];
  }

  getUserControl(): FormArray {
    return <FormArray>this.baseForm.controls['vergiUser'];
  }

  getValue(i?: number): any {
    if (!isNullOrUndefined(i)) {
      return this.getUserControl().value[i];
    }
    return this.getUserControl().value;
  }

  initRowData(data?: any, isDisable?: boolean): FormGroup {
    let group = {};
    if (isNullOrUndefined(isDisable)) isDisable = false;
    if (data) {
      this.fields().forEach(item => {
        group[item.key] = [{value: data[item.key], disabled: isDisable}];
      });
    } else {
      this.fields().forEach(item => {
        if (isNullOrUndefined(item.value)) {
          group[item.key] = [{value: null, disabled: isDisable}];
        } else {
          group[item.key] = [{value: item.value, disabled: isDisable}];
        }
      });
    }
    return this._fb.group(group);
  };

  isVergiSelected(vergi: any) {
    return this.selectedVergiArray.indexOf(vergi) !== -1;
  }

  kalemRemove(item: DnSelect2Item) {
    this.idDetayliBeyanKalem = 0;
    this.removeAllFromForm('vergiUser');
    this.removeAllFromForm('vergiGumruk');
  }

  kalemSelect(item: DnSelect2Item) {
    this.idDetayliBeyanKalem = +item.id;
    this.baseForm.patchValue({idDetayliBeyanKalem: this.idDetayliBeyanKalem});
    this.loadDataUser(this.idDetayliBeyanKalem);
    this.loadDataGumruk(this.idDetayliBeyanKalem);
  }

  loadData(path: string, idDetayliBeyanKalem: number) {
    this.dnHttp.get('detaylibeyankalem/' + idDetayliBeyanKalem + '/' + path, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.removeAllFromForm(path);
        res.data.forEach(data => {
          this.getControl(path).push(this.initRowData(data, path == 'vergiGumruk'));
          this.initCurrMask(0);
        });
      } else {
        this.notificationService.showDinazorResultMessage(res);
      }
    });
  }

  loadDataGumruk(idDetayliBeyanKalem: number) {
    this.loadData('vergiGumruk', idDetayliBeyanKalem);
  }

  loadDataUser(idDetayliBeyanKalem: number) {
    this.loadData('vergiUser', idDetayliBeyanKalem);
  }

  ngAfterViewInit(): void {

  }

  onSubmit() {
    return this.dnHttp.post(this.getValue(), 'DetaylibeyanVergi/List', this.loadingContext())
      .subscribe(this.notificationService.subscribeMessage.bind(this.notificationService));
  }

  removeAllFromForm(path: string) {
    let size = this.getControl(path).length;
    for (let i = 0; i < size; i++) {
      this.getControl(path).removeAt(0);
    }
  }

  removeRow(i: number, extra?: any) {
    this.removeData(i, extra);
  }

  removeSuccessCb(i: number, extra?: any): void {
    this.getUserControl().removeAt(i);
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

  save(data?: any, extra?: any) {
    if (isNullOrUndefined(data)) {
      data = this.getValue();
    }
    return this.dnHttp.post(data, this.restUrl, this.loadingContext())
      .subscribe(res => {
        if (res.isSuccess) {
          this.loadDataUser(this.idDetayliBeyanKalem);
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
          this.loadDataUser(this.idDetayliBeyanKalem);
        }
        this.notificationService.showDinazorResultMessage(res);
      });
  }

  selectedRowMove() {
    const that = this;
    this.selectedVergiArray.forEach(item => {
      item.isGumruk = false;
      item.id = 0;
      that.getUserControl().push(this.initRowData(item));
      this.initCurrMask();
    });
  }

  setDetayliBeyanId(id: number): void {
    this.idDetayliBeyan = id;
  }

  toggleItemInArr(arr, item) {
    const index = arr.indexOf(item);
    index === -1 ? arr.push(item) : arr.splice(index, 1);
  }

  private extendMask() {
    Inputmask.extendAliases({
      'dnCurrency': {
        autoUnmask: true,
        alias: 'numeric',
        groupSeparator: ',',
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        placeholder: '0',
        showMaskOnHover: false
      }
    });
  }

  private initCurrMask(timeout?: number) {
    if (isNullOrUndefined(timeout)) timeout = 0;
    let im = new Inputmask({
      alias: 'dnCurrency',
      showMaskOnHover: false
    });
    setTimeout(() => {
      this.curr.forEach(el => {
        im.mask(el.nativeElement);
      });
    }, timeout);
  }

  private initDetayliBeyanId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        // this.loadData();
      });
  }

  private removeData(i: number, extra?: any) {
    let val = this.getValue(i);
    if (val && val.id) {
      this.notificationService.removeConfirm(() =>
          this.dnHttp.delete(this.restUrl, val.id),
        this.removeSuccessCb.bind(this), i, extra
      );
    } else {
      this.getUserControl().removeAt(i);
    }
  }
}

