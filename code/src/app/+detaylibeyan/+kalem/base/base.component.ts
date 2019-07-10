/**
 * Created by cabbar on 04.05.2017.
 */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  deepCopy,
  DnHttpService,
  DnLoadingBase,
  DnNotificationService,
  DnSelect2Component,
  DnSelect2Item,
  DnSelect2SmartContainerComponent,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { Observable } from 'rxjs/Observable';
import { isArray } from 'util';
import { gtbConst } from '../../../gtb/gtb-const';
import { CurrencyService } from '../../../gtb/services/currency';
import { GtbUtils } from '../../../gtb/services/gtb-utils';
import { DnValidation } from '../../../shared/utils/validation/dn-validation';
import { DetayliBeyanKalemValidationService } from '../../validation/kalem-validations.service';
import { IKalemBaseModel } from '../kalem-base-model';
import { IKalemDefaultModel } from '../kalem-default-model';
import { KalemService } from '../kalem.service';


declare let $: any;

@Component({
  selector: 'detaylibeyan-kalem-base',
  templateUrl: './base.component.html',
  providers: [CurrencyService]
})
export class DetaylibeyanKalemBaseComponent extends DnLoadingBase implements OnInit, AfterViewInit {
  dbForm: FormGroup;
  gtbConst = gtbConst;

  showFooter = true;
  @Input() defaultValues: IKalemDefaultModel;

  private faturaControlName: string = 'fatura';
  private navlumControlName: string = 'navlunBedeli';
  private sigortaControlName: string = 'sigortaBedeli';
  private yurtDisiTRY = {
    yurtdisiKomisyonTRY: 0,
    yurtdisiDemurajTRY: 0,
    yurtdisiRoyaltiTRY: 0,
    yurtdisiFaizTRY: 0,
    yurtdisiDigerTRY: 0,
  }
  @Output('kalemValueChange') kalemValueChange = new EventEmitter();
  @Output('gtipChange') gtipChange = new EventEmitter();
  @Output('loadedDone') loadedDone = new EventEmitter();
  @Output('onSubmit') onSubmitEvent = new EventEmitter();
  @Output('onRemove') onRemoveEvent = new EventEmitter();
  @Output('onShowKalemList') onShowKalemList = new EventEmitter();
  @ViewChild('firmaSelect') firmaSelect: DnSelect2SmartContainerComponent;
  @ViewChild('gtipSelect') gtipSelect: DnSelect2SmartContainerComponent;

  constructor(private _fb: FormBuilder,
              private _kalemService: KalemService,
              private _nf: DnNotificationService,
              private _validation: DnValidation,
              private dnHttp: DnHttpService<any>,
              private gtbUtils: GtbUtils,
              private currService: CurrencyService,
              private _kalemValidation: DetayliBeyanKalemValidationService) {
    super();
  }

  get isDeletable(): boolean {
    return true;
  }

  get isEdit(): boolean {
    return this.kalemId != 0;
  }

  get kalemId(): number {
    return this.dbForm.get('id').value;
  }


  addOdemeSekil(slide?: boolean, odemeSekil?: any): void {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    if (odemeSekil) {
      odemeSekil.id = isNullOrUndefined(odemeSekil.id) ? 0 : odemeSekil.id;
    } else {
      odemeSekil = {
        idOdemeSekil: null,
        value: null,
        idDetayliBeyanKalem: this.kalemId,
        id: 0
      };
    }
    const formArr: FormArray = this.dbForm.controls['detayliBeyanKalemOdemeSekil'] as FormArray;
    formArr.push(
      new FormGroup({
        idOdemeSekil: new FormControl(odemeSekil.idOdemeSekil, Validators.required),
        value: new FormControl(odemeSekil.value, Validators.required),
        id: new FormControl(odemeSekil.id),
        idDetayliBeyanKalem: new FormControl(odemeSekil.idDetayliBeyanKalem)
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-odemesekil-' + (formArr.length - 1));
  }

  changeGtip(value: DnSelect2Item) {
    const baseModel: IKalemBaseModel = {
      kalemNo: this.dbForm.get('kalemNo').value,
      id: this.dbForm.get('id').value,
      gtip: value.id
    };
    this.gtipChange.emit(baseModel);
  }

  clearForm() {
    let val = deepCopy(this.defaultValues);
    this.resetOdemeSekil();
    this.dbForm.reset(val);

  }

  loadData(cache?: any) {
    if (isNullOrUndefined(this.defaultValues)) return;
    if (cache) {
      this.resetForm(cache);
      return;
    }
    if (this.defaultValues.id > 0) {
      this._kalemService.getKalemById(this.defaultValues.id, this.loadingContext()).subscribe(res => {
        if (res.isSuccess) {
          res.data['teslimSekli'] = this.defaultValues.teslimSekli;
          const hasTescilValue = !isNullOrUndefinedOrEmpty(res.data['tescilNo']);
          if (!hasTescilValue) {
            this.valueChanges();
          }
          this.patchForm(res.data, true, () => {
            this.loadedDone.emit();
          });
        } else {
          this._nf.showDinazorResultMessage(res);
        }
        // this.patchForm({teslimSekli: this.defaultValues.teslimSekli});
        // setTimeout(() => this.loadedDone.emit(), 500);
      });
    } else {
      this.resetForm(this.defaultValues, () => {
        this.valueChanges();
        this.loadedDone.emit();
      });
      // setTimeout(() => this.loadedDone.emit(), 300);
    }
  }

  ngAfterViewInit(): void {
    this.loadData();
    this.calculateYurticiToplamEvent();
    this._validation.initializeValidation(this.dbForm, this._kalemValidation.getValidations());

    this.dbForm.valueChanges.subscribe(kalem => this.kalemValueChange.emit(kalem));
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDelete() {
    this.deleteKalem();
  }

  onSubmit() {
    if (this.isEdit) {
      this.updateKalem();
    } else {
      this.saveKalem();
    }
  }

  refreshFirma(event) {
    if (isNullOrUndefined(this.firmaSelect)) return;
    (this.firmaSelect.getSelect2() as DnSelect2Component<any>).loadData();
  }

  removeOdemeSekil(i: number): void {
    const formArr: FormArray = this.dbForm.controls['detayliBeyanKalemOdemeSekil'] as FormArray;
    if (formArr.value.length == 1) {
      this._nf.showWarning('En az 1 adet ödeme şekli olmalıdır.');
      return;
    }
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeOdemeSekil(i);
    } else {
      this._nf.removeConfirm(() => this._kalemService.deleteOdemeSekil(val.id),
        this._removeOdemeSekil.bind(this), i);
    }
  }

  setDisable() {
    this.showFooter = false;
    for (let prop in this.dbForm.controls) {
      if (this.dbForm.controls.hasOwnProperty(prop)) {
        this.dbForm.get(prop).disable({emitEvent: false});
      }
    }
  }

  showKalemList() {
    this.onShowKalemList.emit();
  }

  private _removeOdemeSekil(i: number): void {
    const formArr: FormArray = this.dbForm.controls['detayliBeyanKalemOdemeSekil'] as FormArray;
    $('#repeater-block-odemesekil-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }

  private calculateKiymet() {
    let toplam: number = 0;
    const faturaTryBeledi = this.dbForm.get('faturaTRY').value;
    if (!isNaN(faturaTryBeledi)) {
      toplam += +(faturaTryBeledi);
    }
    const navlunBedeli = this.dbForm.get('navlunBedeliTRY').value;
    if (!isNaN(navlunBedeli)) {
      toplam += +(navlunBedeli);
    }
    const sigortaTryBedeli = this.dbForm.get('sigortaBedeliTRY').value;
    if (!isNaN(sigortaTryBedeli)) {
      toplam += +(sigortaTryBedeli);
    }
    this.dbForm.get('gumrukKiymeti').setValue(toplam, {emitEvent: false});
    this.getKurValue('USD').subscribe(kur => {
      if (isNaN(kur)) return;
      const istatistiki = toplam / kur;
      this.dbForm.get('istatistikiKiymet').setValue(istatistiki.toFixed(2), {emitEvent: false});
    });
  }

  private calculateYurtdisiToplam() {
    let toplam: number = 0;
    toplam += this.yurtDisiTRY.yurtdisiKomisyonTRY;
    toplam += this.yurtDisiTRY.yurtdisiDemurajTRY;
    toplam += this.yurtDisiTRY.yurtdisiRoyaltiTRY;
    toplam += this.yurtDisiTRY.yurtdisiFaizTRY;
    toplam += this.yurtDisiTRY.yurtdisiDigerTRY;
    this.dbForm.get('yurtdisiDigerTRY').setValue(toplam, {emitEvent: false});
  }

  private calculateYurticiToplam() {
    const value = this.dbForm.getRawValue();
    let toplam = 0;
    if (!isNullOrUndefinedOrEmpty(value.yurticiKkdf) && !isNaN(value.yurticiKkdf)) {
      toplam += +value.yurticiKkdf;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiKulturBakanligiKesinti) && !isNaN(value.yurticiKulturBakanligiKesinti)) {
      toplam += +value.yurticiKulturBakanligiKesinti;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiLimanGiderleri) && !isNaN(value.yurticiLimanGiderleri)) {
      toplam += +value.yurticiLimanGiderleri;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiCevreKatkiPayi) && !isNaN(value.yurticiCevreKatkiPayi)) {
      toplam += +value.yurticiCevreKatkiPayi;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiTahmilTahliyeGider) && !isNaN(value.yurticiTahmilTahliyeGider)) {
      toplam += +value.yurticiTahmilTahliyeGider;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiDepolamaGiderleri) && !isNaN(value.yurticiDepolamaGiderleri)) {
      toplam += +value.yurticiDepolamaGiderleri;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiBankaMasraflari) && !isNaN(value.yurticiBankaMasraflari)) {
      toplam += +value.yurticiBankaMasraflari;
    }
    if (!isNullOrUndefinedOrEmpty(value.yurticiDiger) && !isNaN(value.yurticiDiger)) {
      toplam += +value.yurticiDiger;
    }
    this.dbForm.get('yurticiGiderToplam').setValue(toplam, {emitEvent: false});
  }

  private calculateYurticiToplamEvent() {
    this.dbForm.get('yurticiKkdf').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiKulturBakanligiKesinti').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiLimanGiderleri').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiCevreKatkiPayi').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiTahmilTahliyeGider').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiDepolamaGiderleri').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiBankaMasraflari').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('yurticiDiger').valueChanges.subscribe(val => this.calculateYurticiToplam());
    this.dbForm.get('gtip').valueChanges.subscribe(value => {
      if (isNullOrUndefined(value)) {
        this.dbForm.get('tarifedekiTanimi').setValue(null, {emitEvent: false});
      } else {
        this.gtipSelect.getService().getItems([value]).subscribe((selectValue: any) => {
          if (isArray(selectValue) && selectValue.length > 0)
            this.dbForm.get('tarifedekiTanimi').setValue(selectValue[0].name, {emitEvent: false});
        });

      }
    });
  }

  private deleteKalem() {
    if (this.kalemId > 0) {
      this._nf.removeConfirm(() =>
          this.dnHttp.delete('detaylibeyankalem', this.kalemId)
        , this.removeSuccessEvent.bind(this));
    } else {
      this._nf.confirm('Silmek istediğinize emin misiniz ?', 'Silme işlemi', this.removeSuccessEvent.bind(this));
    }
  }

  private getData() {
    let val = deepCopy(this.dbForm.getRawValue());
    delete val['tarifedekiTanimi'];
    if (val.id != 0) {
      const odemeSekilArr = val.detayliBeyanKalemOdemeSekil;
      if (isArray(odemeSekilArr)) {
        const filtered = odemeSekilArr.filter(l => !isNullOrUndefined(l.idOdemeSekil) && !isNullOrUndefined(l.value));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i].idDetayliBeyanKalem != this.kalemId) {
            filtered[i].idDetayliBeyanKalem = this.kalemId;
          }
        }
        val.detayliBeyanKalemOdemeSekil = filtered;
      }
    }
    return val;
  }

  private getKurValue(currencyCode): Observable<number> {
    if (currencyCode == 'TRY') return Observable.of(1);
    return this.currService.getCurrency().map(res => {
      if (!isNullOrUndefined(res) && res.isSuccess && isArray(res.data)) {
        const filtered = res.data.filter(item => item.currencyCode == currencyCode);
        if (filtered.length > 0) {
          if (this.gtbUtils.isIhracat(this.defaultValues.rejimKod)) {
            return isNaN(+filtered[0].forexBuying) ? 0 : +filtered[0].forexBuying;
          } else {
            return isNaN(+filtered[0].forexSelling) ? 0 : +filtered[0].forexSelling;
          }
        }
        return 0;
      }
    });

  }

  private initForm() {
    this.dbForm = this._fb.group({
      id: [0],
      idDetayliBeyan: [0],
      tmpRejimKod: [null],
      tmpBsKod: [null],
      kalemNo: ['1'],
      aciklamalar: [null],
      ticariTanimi: [null],
      tarifedekiTanimi: [null],
      esyaninGirisCikisAmaciAciklama: [null],
      yurticiDigerAciklama: [null],
      digerAciklama: [null],
      detayliBeyanKalemOdemeSekil: this._fb.array([])
    });
    this.dbForm.get('tarifedekiTanimi').disable();

  }

  private patchForm(value, emitEvent: boolean = true, cb: () => void) {
    setTimeout(() => {
      this.dbForm.patchValue(value, {emitEvent: emitEvent});
      if (isArray(value.detayliBeyanKalemOdemeSekil)) {
        this.dbForm.controls['detayliBeyanKalemOdemeSekil'] = this._fb.array([]);
        value.detayliBeyanKalemOdemeSekil.forEach(l => this.addOdemeSekil(true, l));
      }
      if (cb)
        cb();
    }, 10);
  }

  private removeSuccessEvent() {
    this.onRemoveEvent.emit(this.getData());
  }

  private resetForm(value, cb?: () => void) {
    setTimeout(() => {
      this.dbForm.reset(value);
      this.dbForm.controls['detayliBeyanKalemOdemeSekil'] = this._fb.array([]);
      this.addOdemeSekil(true);
      if (cb)
        cb();
    }, 10);
  }

  private resetOdemeSekil() {
    this.dbForm.controls['detayliBeyanKalemOdemeSekil'] = this._fb.array([]);
    this.addOdemeSekil();
  }

  private saveKalem() {
    let val = this.getData();
    this.dnHttp.post(val, 'detaylibeyankalemV2', this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        val.id = res.objectId;
        this.dbForm.get('id').setValue(val.id, {emitEvent: false});
        this.onSubmitEvent.emit(val);
      }
      this._nf.showDinazorResultMessage(res);
    });
  }

  private slideDown(id: string) {
    const div = $(id);
    setTimeout(() => {
      if (div.length == 1) {
        div.slideDown('fast', () => {
          if ($(id).css('display') === 'none') {
            $(id).css('display', 'block');
          }
        });
      } else {
        this.slideDown(id);
      }
    }, 20);
  }

  private sortKalemList(o1, o2): number {
    if (o1.kalemNo > o2.kalemNo) return 1;
    if (o1.kalemNo < o2.kalemNo) return -1;
    return 0;
  }

  private updateKalem() {
    let val = this.getData();
    this.dnHttp.put(val, 'detaylibeyankalemV2', this.loadingContext())
      .subscribe(res => {
        this._nf.showDinazorResultMessage(res);
        if (res.isSuccess) {
          this.onSubmitEvent.emit(val);
        }
      });
  }

  private valueChangedText(faturaControlName) {
    this.dbForm.get(faturaControlName).valueChanges.subscribe(fatura => {
      if (fatura != null && !isNaN(fatura)) {
        const faturaDoviz: any = this.dbForm.get(faturaControlName + 'Doviz').value;
        if (!isNullOrUndefinedOrEmpty(faturaDoviz)) {
          this.getKurValue(faturaDoviz).subscribe(kur => {
            this.dbForm.get(faturaControlName + 'TRY').setValue((+( kur * fatura)).toFixed(6), {emitEvent: false})
            // this[faturaControlName].value = (+( kur * fatura)).toFixed(6);
            this.calculateKiymet();
          });
        }
      }
    });

    this.dbForm.get(faturaControlName + 'Doviz').valueChanges.subscribe(doviz => {
      if (doviz != null) {
        const deger: any = this.dbForm.get(faturaControlName).value;
        if (!isNullOrUndefinedOrEmpty(deger)) {
          this.getKurValue(doviz).subscribe(kur => {
            this.dbForm.get(faturaControlName + 'TRY').setValue((+( kur * deger)).toFixed(6), {emitEvent: false})
            this.calculateKiymet();
          });
        }
      }
    });
  }

  private valueChangedYurtdisi(faturaControlName) {
    this.dbForm.get(faturaControlName).valueChanges.subscribe(fatura => {
      if (fatura != null && !isNaN(fatura)) {
        const faturaDoviz: any = this.dbForm.get(faturaControlName + 'Doviz').value;
        if (!isNullOrUndefinedOrEmpty(faturaDoviz)) {
          this.getKurValue(faturaDoviz).subscribe(kur => {
            this.yurtDisiTRY[faturaControlName + 'TRY'] = +(+( kur * fatura)).toFixed(6);
            this.calculateYurtdisiToplam();
          });
        }
      }
    });

    this.dbForm.get(faturaControlName + 'Doviz').valueChanges.subscribe(doviz => {
      if (doviz != null) {
        const deger: any = this.dbForm.get(faturaControlName).value;
        if (!isNullOrUndefinedOrEmpty(deger)) {
          this.getKurValue(doviz).subscribe(kur => {
            this.yurtDisiTRY[faturaControlName + 'TRY'] = +(+( kur * deger)).toFixed(6);
            this.calculateYurtdisiToplam();
          });
        }
      }
    });
  }

  private valueChanges() {
    this.valueChangedText(this.faturaControlName);
    this.valueChangedText(this.navlumControlName);
    this.valueChangedText(this.sigortaControlName);
    this.valueChangedYurtdisi('yurtdisiKomisyon');
    this.valueChangedYurtdisi('yurtdisiDemuraj');
    this.valueChangedYurtdisi('yurtdisiRoyalti');
    this.valueChangedYurtdisi('yurtdisiFaiz');
    this.valueChangedYurtdisi('yurtdisiDiger');
  }

}
