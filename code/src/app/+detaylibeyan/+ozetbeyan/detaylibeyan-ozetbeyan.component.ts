/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnLoadingBase, DnNotificationService, DnSelect2Item } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;

@Component({
  templateUrl: './detaylibeyan-ozetbeyan.component.html',
  styleUrls: ['./detaylibeyan-ozetbeyan.component.css']
})
export class DetaylibeyanOzetbeyanComponent extends DnLoadingBase implements OnInit {


  // <editor-fold desc='Properties'>
  dbOzetbeyanForm: FormGroup;
  detayliBeyanNo: any = '';
  idDetayliBeyan: number;
  gtbConst = gtbConst;
  formArrName = 'ozetbeyanList';
  displaySelectOzby: (_: DnSelect2Item) => string = res => res.entity['tescilNo'];
  displaySelectTasimaSenet: (_: DnSelect2Item) => string = res => res.entity['tasimaSenetNo'];
  displaySelectTasimaSatir: (_: DnSelect2Item) => string = res => res.entity['tasimaSatirNo'] + '';

  constructor(private _fb: FormBuilder,
              private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private route: ActivatedRoute) {
    super();
    this.dbOzetbeyanForm = this._fb.group({
      ozetbeyanList: this._fb.array([])
    });
  }

  // </editor-fold>

  get isEdit(): boolean {
    return false;
    // return this.dbOzetbeyanForm.get('id').value != 0
  }

  // <editor-fold desc='Private Methods'>
  addOzetbeyanSatir() {
    this.getControl().push(this.initOzetbeyan());
  }

  addTasimaSatirSatir(control: FormArray) {
    control.push(this.initTasimaSatirSatir());
  }

  addTasimaSenetSatir(control: FormArray) {
    control.push(this.initTasimaSenetSatir());
  }

  getControl(): FormArray {
    return <FormArray>this.dbOzetbeyanForm.controls[this.formArrName];
  }

  getRowValue(i: number): any {
    this.getControl()[i].value;
  }

  // </editor-fold>

  initForm(data?: any) {
    if (data) {
      data.forEach(item => {
        (<FormArray>this.dbOzetbeyanForm.get('ozetbeyanList')).push(this.initOzetbeyan(item));
      });
    }
  }

  initOzetbeyan(data?: any) {
    const fg = {};
    if (data) {
      fg['id'] = [data.id];
      fg['idDetayliBeyan'] = [this.idDetayliBeyan, Validators.required];
      fg['ozetBeyanIslemKapsami'] = [data.ozetBeyanIslemKapsami, Validators.required];
      fg['isAmbarIci'] = [data.isAmbarIci, Validators.required];
      fg['isBaskaRejim'] = [data.isBaskaRejim, Validators.required];
      fg['aciklama'] = [data.aciklama];
      fg['ozetBeyanNo'] = [data.ozetBeyanNo, Validators.required];
      let detayliBeyanTasimaSenetList = this._fb.array([]);
      if (data.detayliBeyanTasimaSenetList && data.detayliBeyanTasimaSenetList.length > 0) {
        for (let i = 0; i < data.detayliBeyanTasimaSenetList.length; i++) {
          detayliBeyanTasimaSenetList.push(this.initTasimaSenetSatir(data.detayliBeyanTasimaSenetList[i]));
        }
      }
      fg['detayliBeyanTasimaSenetList'] = detayliBeyanTasimaSenetList;
    } else {
      fg['id'] = [0];
      fg['idDetayliBeyan'] = [this.idDetayliBeyan, Validators.required];
      fg['ozetBeyanIslemKapsami'] = [null, Validators.required];
      fg['isAmbarIci'] = [null, Validators.required];
      fg['isBaskaRejim'] = [null, Validators.required];
      fg['aciklama'] = [null];
      fg['ozetBeyanNo'] = [null, Validators.required];
      fg['detayliBeyanTasimaSenetList'] = this._fb.array([]);
    }
    return this._fb.group(fg);
  }

  initTasimaSatirSatir(data?: any) {
    const fg = {};
    if (data) {
      fg['id'] = [data.id];
      fg['idDetayliBeyanTasimaSenet'] = [data.idDetayliBeyanTasimaSenet, Validators.required];
      fg['tasimaSatirNo'] = [data.tasimaSatirNo, Validators.required];
      fg['ambarKodu'] = [data.ambarKodu];
      fg['acilacakMiktar'] = [data.acilacakMiktar, Validators.required];

    } else {
      fg['id'] = [0];
      fg['idDetayliBeyanTasimaSenet'] = [0, Validators.required];
      fg['tasimaSatirNo'] = [null, Validators.required];
      fg['ambarKodu'] = [null];
      fg['acilacakMiktar'] = [null, Validators.required];
    }
    return this._fb.group(fg);
  }

  initTasimaSenetSatir(data?: any) {
    const fg = {};
    if (data) {
      fg['id'] = [data.id];
      fg['idDetayliBeyanOzetBeyan'] = [data.idDetayliBeyanOzetBeyan];
      fg['tasimaSenetNo'] = [data.tasimaSenetNo, Validators.required];
      let detayliBeyanTasimaSatirList = this._fb.array([]);
      if (data.detayliBeyanTasimaSatirList && data.detayliBeyanTasimaSatirList.length > 0) {
        for (let i = 0; i < data.detayliBeyanTasimaSatirList.length; i++) {
          detayliBeyanTasimaSatirList.push(this.initTasimaSatirSatir(data.detayliBeyanTasimaSatirList[i]));
        }
      }
      fg['detayliBeyanTasimaSatirList'] = detayliBeyanTasimaSatirList;
    } else {
      fg['id'] = [0];
      fg['idDetayliBeyanOzetBeyan'] = [0];
      fg['tasimaSenetNo'] = [null, Validators.required];
      fg['detayliBeyanTasimaSatirList'] = this._fb.array([]);
    }
    return this._fb.group(fg);
  }

  // <editor-fold desc='İnitializing'>
  ngOnInit() {
    this.initDetayliBeyanId();

  }

  onSubmit() {
    this.dnHttp.post(this.getFormData(), 'DetayliBeyanOzetBeyan/List', this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.resetForm();
        this.loadData(this.notificationService.showDinazorResultMessage.bind(this.notificationService), res);
      } else {
        this.notificationService.showDinazorResultMessage(res);
      }
    });
  }

  removeData(data: any, url: string, i: number, cb: (i: number) => void) {

    if (data.id == 0) {
      cb(i);
    } else {
      this.notificationService.removeConfirm(() => {
        return this.dnHttp.delete(url, data.id);
      }, cb.bind(this), i);

      /*
            this.dnHttp.setUrl(url);
            this.dnHttp.delete(data.id).subscribe(res => {
              if (res.isSuccess) {
                cb(i);
              } else {
                this.notificationService.showDinazorResultMessage(res);
              }
            });
      */
    }
  }

  removeDokuman(i: number) {
    let val = this.getRowValue(i);

    if (val && val.id) {
      this.dnHttp.delete('DetaylibeyanOzetbeyan', val.id).subscribe();
    }
  }

  removeOzetbeyanSatir(i: number) {
    this.removeData(this.getFormData()[i],
      'DetayliBeyanOzetBeyan', i, this.getControl().removeAt.bind(this.dbOzetbeyanForm.controls['ozetbeyanList']));
    // this.getControl().removeAt(i);

  }

  removeTasimaSatirSatir(control: FormArray, i: number) {
    control.removeAt(i);
  }

  /*  getTasimaSenetUrl(ozbyControl: FormControl) {
      let ozbyId = ozbyControl.get('simpleOzetBeyan').value.id;
      return 'ozetbeyan/' + ozbyId + '/TasimaSenet/simple';
    }*/

  /*getTasimaSatirUrl(senetControl: FormControl) {
    let senetId = senetControl.get('simpleTasimaSenet').value.id;
    return 'TasimaSenet/' + senetId + '/TasimaSatir/simple';
  }*/

  removeTasimaSenetSatir(control: FormArray, i: number) {
    control.removeAt(i);
  }

  private getFormData() {
    return this.dbOzetbeyanForm.getRawValue().ozetbeyanList;
  }

  private initDetayliBeyanId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        if (isNaN(this.idDetayliBeyan)) return;
        // this.initSimpleDetayliBeyan();
        this.loadData();

      });
  }

  private initSimpleDetayliBeyan() {
    this.dnHttp.get('Detaylibeyan/Simple/' + this.idDetayliBeyan).subscribe(res => {
      if (res.isSuccess) {
        this.detayliBeyanNo = res.data['tescilNo'];
      }
    });
  }

  private loadData(cb?: (param1) => void, param1?: any) {
    this.dnHttp.get('detaylibeyan/' + this.idDetayliBeyan + '/Ozetbeyan', this.loadingContext()).subscribe(res => {
      if (res.isSuccess && res.data && res.data.length > 0) {
        this.initForm(res.data);
        if (cb) {
          cb(param1);
        }
      } else {
        this.initForm();
      }
    });
  }

  private resetForm() {
    this.dbOzetbeyanForm.setControl('ozetbeyanList', this._fb.array([]));
  }

  // </editor-fold>

}
