import { Inject, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DnNotificationService, isNullOrUndefined } from '@dinazor/core';
import { IOzetbeyanService } from './ozetbeyan-base.service';
import { beyanConfig } from './ozetbeyan-shared.config';

/**
 * Created by cabbar on 31.05.2017.
 */
declare let $: any;

@Injectable()
export class RepeaterService {
  ugranilanUlkelerListName = 'ugranilanUlkelerList';
  esyaSatirListName = 'esyaSatirList';
  idTasimaSenet: number = 0;
  private beyanType: number;


  constructor(@Inject('IOzetbeyanService') private _service: IOzetbeyanService,
              private _nf: DnNotificationService) {
  }

  get ihracatListName(): string {
    if (this.beyanType == beyanConfig.ozetbeyan) {
      return 'ihracatIlgiliBeyanList';
    } else if (this.beyanType == beyanConfig.varisbildirimi) {
      return 'varisBildirimiIhracatIlgiliBeyanList';
    } else if (this.beyanType == beyanConfig.cikisbildirimi) {
      return 'cikisBildirimiIhracatIlgiliBeyanList';
    }
  }

  get tasimaSatirListName(): string {
    if (this.beyanType == beyanConfig.ozetbeyan) {
      return 'tasimaSatirList';
    } else if (this.beyanType == beyanConfig.varisbildirimi) {
      return 'varisBildirimiTasimaSatirList';
    } else if (this.beyanType == beyanConfig.cikisbildirimi) {
      return 'cikisBildirimiTasimaSatirList';
    }
  }

  addEsyaSatir(form: FormGroup, tasimaSatirIndex: number, slide?: boolean, esyaSatir?: any): void {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    const idTasimaSatir = form.get('id').value;
    if (esyaSatir) {
      esyaSatir.id = isNullOrUndefined(esyaSatir.id) ? 0 : esyaSatir.id;
    } else {
      esyaSatir = {
        kalemSiraNo: null,
        gtipNo: null,
        esyaTanim: null,
        olcuBirim: null,
        brutAgirlik: null,
        netAgirlik: null,
        kalemFiyatDoviz: null,
        kalemFiyat: null,
        bmEsyaKodu: null,
        idTasimaSatir: 0,
        id: 0
      };
    }
    const formArr: FormArray = form.controls[this.esyaSatirListName] as FormArray;
    formArr.push(
      new FormGroup({
        kalemSiraNo: new FormControl(esyaSatir.kalemSiraNo),
        gtipNo: new FormControl(esyaSatir.gtipNo),
        esyaTanim: new FormControl(esyaSatir.esyaTanim),
        olcuBirim: new FormControl(esyaSatir.olcuBirim),
        brutAgirlik: new FormControl(esyaSatir.brutAgirlik),
        netAgirlik: new FormControl(esyaSatir.netAgirlik),
        kalemFiyatDoviz: new FormControl(esyaSatir.kalemFiyatDoviz),
        kalemFiyat: new FormControl(esyaSatir.kalemFiyat),
        bmEsyaKodu: new FormControl(esyaSatir.bmEsyaKodu),
        id: new FormControl(esyaSatir.id),
        idTasimaSatir: new FormControl(idTasimaSatir)
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-esya-satir-' + tasimaSatirIndex + '-' + (formArr.length - 1));
  }

  addIhracatSatir(form: FormGroup, slide?: boolean, ihracat?: any): void {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    if (ihracat) {
      ihracat.id = isNullOrUndefined(ihracat.id) ? 0 : ihracat.id;
    } else {
      ihracat = {
        ihracatIlgiliBeyanTip: null,
        numarasi: null,
        isParcali: null,
        gonderen: null,
        kapAdet: null,
        brutAgirlik: null,
        id: 0,
        idTasimaSenet: this.idTasimaSenet
      };
    }
    const formArr: FormArray = form.controls[this.ihracatListName] as FormArray;
    formArr.push(
      new FormGroup({
        ihracatIlgiliBeyanTip: new FormControl(ihracat.ihracatIlgiliBeyanTip),
        numarasi: new FormControl(ihracat.numarasi),
        isParcali: new FormControl(ihracat.isParcali),
        gonderen: new FormControl(ihracat.gonderen),
        kapAdet: new FormControl(ihracat.kapAdet),
        brutAgirlik: new FormControl(ihracat.brutAgirlik),
        id: new FormControl(ihracat.id),
        idTasimaSenet: new FormControl(this.idTasimaSenet)
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-ihracat-' + (formArr.length - 1));
  }

  addTasimaSatir(form: FormGroup, slide?: boolean, tasimaSatir?: any): FormGroup {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    let esyaSatirList = new FormArray([]);
    if (tasimaSatir) {
      tasimaSatir.id = isNullOrUndefined(tasimaSatir.id) ? 0 : tasimaSatir.id;
    } else {
      tasimaSatir = {
        kapKod: null,
        kapAdet: null,
        markaNo: null,
        konteynerTip: null,
        olcuBirim: null,
        brutAgirlik: null,
        netAgirlik: null,
        muhurNo: null,
        id: 0,
        idTasimaSenet: this.idTasimaSenet
      };
    }
    const formArr: FormArray = form.controls[this.tasimaSatirListName] as FormArray;
    formArr.push(
      new FormGroup({
        kapKod: new FormControl(tasimaSatir.kapKod),
        kapAdet: new FormControl(tasimaSatir.kapAdet),
        markaNo: new FormControl(tasimaSatir.markaNo),
        konteynerTip: new FormControl(tasimaSatir.konteynerTip),
        olcuBirim: new FormControl(tasimaSatir.olcuBirim),
        brutAgirlik: new FormControl(tasimaSatir.brutAgirlik),
        netAgirlik: new FormControl(tasimaSatir.netAgirlik),
        muhurNo: new FormControl(tasimaSatir.muhurNo),
        id: new FormControl(tasimaSatir.id),
        idTasimaSenet: new FormControl(this.idTasimaSenet),
        esyaSatirList: esyaSatirList
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-tasima-satir-' + (formArr.length - 1));
    return formArr.controls[(formArr.length - 1)] as FormGroup;
  }

  addUgranilanUlkeSatir(form: FormGroup, slide?: boolean, ugranilanUlke?: any): void {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    if (ugranilanUlke) {
      ugranilanUlke.id = isNullOrUndefined(ugranilanUlke.id) ? 0 : ugranilanUlke.id;
    } else {
      ugranilanUlke = {
        limanKod: null,
        ulkeKod: null,
        idTasimaSenet: this.idTasimaSenet,
        id: 0
      };
    }
    const formArr: FormArray = form.controls[this.ugranilanUlkelerListName] as FormArray;
    formArr.push(
      new FormGroup({
        limanKod: new FormControl(ugranilanUlke.limanKod),
        ulkeKod: new FormControl(ugranilanUlke.ulkeKod),
        id: new FormControl(ugranilanUlke.id),
        idTasimaSenet: new FormControl(this.idTasimaSenet)
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-ulke-' + (formArr.length - 1));
  }

  addVarisCikisLimaniSatir(form: FormGroup, type: number, idBeyan: number, slide?: boolean, ugranilanUlke?: any): void {
    if (isNullOrUndefined(slide)) {
      slide = true;
    }
    if (ugranilanUlke) {
      ugranilanUlke.id = isNullOrUndefined(ugranilanUlke.id) ? 0 : ugranilanUlke.id;
    } else {
      ugranilanUlke = {
        limanKod: null,
        ulkeKod: null,
        idBeyan: idBeyan,
        id: 0,
        hareketTarih: null
      };
    }
    const formArr: FormArray = form.controls[this.getVarisCikisLimaniSatirName(type)] as FormArray;
    formArr.push(
      new FormGroup({
        limanKod: new FormControl(ugranilanUlke.limanKod),
        ulkeKod: new FormControl(ugranilanUlke.ulkeKod),
        hareketTarih: new FormControl(ugranilanUlke.hareketTarih),
        idBeyan: new FormControl(idBeyan),
        id: new FormControl(ugranilanUlke.id),
      })
    );
    if (slide === true)
      this.slideDown('#repeater-block-varis-cikis-' + (formArr.length - 1));
  }

  getVarisCikisLimaniSatirName(type: number): string {
    if (type === beyanConfig.varisbildirimi) {
      return 'varisBildirimiTasitinUgradigiUlkelerList';
    } else if (type === beyanConfig.cikisbildirimi) {
      return 'cikisBildirimiTasitinUgradigiUlkelerList';
    }
  }

  removeEsyaSatir(form: FormGroup, tasimaSatirIndex: number, i: number): void {
    const formArr: FormArray = form.controls[this.esyaSatirListName] as FormArray;
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeEsyaSatir(form, tasimaSatirIndex, i);
    } else {
      this._nf.removeConfirm(() => this._service.deleteEsyaSatir(val.id),
        this._removeEsyaSatir.bind(this), form, tasimaSatirIndex, i);
    }
  }

  removeIhracatSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.ihracatListName] as FormArray;
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeIhracatSatir(form, i);
    } else {
      this._nf.removeConfirm(() => this._service.deleteIhracatIlgiliBeyan(val.id),
        this._removeIhracatSatir.bind(this), form, i);
    }
  }

  removeTasimaSatirSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.tasimaSatirListName] as FormArray;
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeTasimaSatirSatir(form, i);
    } else {
      this._nf.removeConfirm(() => this._service.deleteTasimaSatir(val.id),
        this._removeTasimaSatirSatir.bind(this), form, i);
    }
  }

  removeUgranilanUlkeSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.ugranilanUlkelerListName] as FormArray;
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeUgranilanUlkeSatir(form, i);
    } else {
      this._nf.removeConfirm(() => this._service.deleteEsyaninUgradigiUlkeler(val.id),
        this._removeUgranilanUlkeSatir.bind(this), form, i);
    }
  }

  removeVarisCikisLimani(form: FormGroup, i: number, type: number): void {
    const formArr: FormArray = form.controls[this.getVarisCikisLimaniSatirName(type)] as FormArray;
    let val = formArr.value[i];
    if (val.id == 0) {
      this._removeVarisCikisLimani(form, i, type);
    } else {
      let that = this;
      this._nf.removeConfirm(() => this._service.deleteVarisCikisLimani(val.id),
        this._removeVarisCikisLimani.bind(this), form, i, type);
    }
  }

  setBeyanType(beyanType: number) {
    this.beyanType = beyanType;
  }

  setIdTasimaSenet(idTasimaSenet: number) {
    this.idTasimaSenet = idTasimaSenet;
  }

  slideDown(id: string) {
    const div = $(id);
    setTimeout(() => {
      if (div.length == 1) {
        div.slideDown('fast', () => {
          if ($(id).css('display') === 'none') {
            div.slideDown('fast');
          }
        });
      } else {
        this.slideDown(id);
      }
    }, 20);
  }

  private _removeEsyaSatir(form: FormGroup, tasimaSatirIndex: number, i: number): void {
    const formArr: FormArray = form.controls[this.esyaSatirListName] as FormArray;
    $('#repeater-block-esya-satir-' + tasimaSatirIndex + '-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }

  private _removeIhracatSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.ihracatListName] as FormArray;
    $('#repeater-block-ihracat-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }

  private _removeTasimaSatirSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.tasimaSatirListName] as FormArray;
    $('#repeater-block-tasima-satir-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }

  private _removeUgranilanUlkeSatir(form: FormGroup, i: number): void {
    const formArr: FormArray = form.controls[this.ugranilanUlkelerListName] as FormArray;
    $('#repeater-block-ulke-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }

  private _removeVarisCikisLimani(form: FormGroup, i: number, type: number): void {
    const formArr: FormArray = form.controls[this.getVarisCikisLimaniSatirName(type)] as FormArray;
    $('#repeater-block-varis-cikis-' + i).slideUp(200, () => {
      formArr.removeAt(i);
    });
  }
}
