import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  deepCopy,
  Dictionary,
  DnLoadingBase,
  DnNotificationService,
  DnSelect2Item,
  IDictionary,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { gtbConst } from '../../../gtb-const';
import { IOzetbeyanService } from '../ozetbeyan-base.service';
import { beyanConfig } from '../ozetbeyan-shared.config';
import { RepeaterService } from '../repeater.service';

declare let $: any;

@Component({
  selector: 'gtb-ozetbeyan-tasima-senet',
  templateUrl: './ozetbeyan-tasima-senet.component.html',
  styles: [`
    .dn-selected {
      background-color: #90ee90;
    }

    .senetSiraNo {
      cursor: pointer;
    }

    .yeni-satir {
      padding: 0;
      margin-top: 10px;
      background-color: transparent;
      border: none;
    }
  `],
  providers: [RepeaterService]
})
export class OzetbeyanTasimaSenetComponent extends DnLoadingBase {

  @Input() beyanTuruCode: string;
  form: FormGroup;
  beyanConfig = beyanConfig;
  displaySelectOzby: (_: DnSelect2Item) => string = res => res.entity['tescilNo'];

  gtbConst = gtbConst;
  satirService: RepeaterService;
  defaultValues: any;
  tasimaSenetList: IDictionary = new Dictionary();
  dirtyList: IDictionary = new Dictionary();
  isDirtySubscribe: boolean = false;
  idOzetbeyan: number = NaN;

  private tescilNo: string = '-1';
  private ozetbeyanData: any;

  constructor(private _fb: FormBuilder,
              private _satirService: RepeaterService,
              @Inject('IOzetbeyanService') private _service: IOzetbeyanService,
              private _nf: DnNotificationService) {
    super();
    this.satirService = _satirService;

  }

  private _beyanType: number = NaN;

  get beyanType(): number {
    return this._beyanType;
  }

  @Input()
  set beyanType(beyanType: number) {
    this._beyanType = beyanType;
    this.satirService.setBeyanType(this.beyanType);
  }

  get isEdit() {
    return this.form.value.id > 0;
  }

  get isTescil(): boolean {
    return !isNullOrUndefinedOrEmpty(this.form.value.tescilNo);
  }

  @Input()
  set ozetbeyan(data) {
    this.ozetbeyanData = data;
  }

  get senetSiraNo() {
    return this.form.getRawValue().senetSiraNo;
  }

  getLimanUrl() {
    if (this.beyanTuruCode) {
      if ((this.beyanTuruCode == 'HAVİHR' || this.beyanTuruCode == 'HAVİTH')) {
        return 'havalimani';
      }
    }
    return 'limankod';
  }

  getTasimaSenet(senetSiraNo) {
    let value = this.tasimaSenetList.get(senetSiraNo);
    // TODO senetSiraNo.id yanlış gibi
    this._satirService.setIdTasimaSenet(value.id);
    this.resetForm();
    this.patchForm(value);
  }

  initForm() {
    this.form = this._fb.group({
      id: [0],
      tescilNo: [null],
      senetSiraNo: [{value: 1, disabled: true}],
      isGrup: [false],
      isAmbarHarici: [false],
      isKonteyner: [false],
      isRoro: [false],
      isEmniyetGuvenlik: [false],
      isAktarma: [false],
      navlunTutar: ['0.00']
    });
    if (this.beyanType == beyanConfig.ozetbeyan) {
      this.form.addControl('idOzetBeyan', new FormControl(0));
    } else if (this.beyanType == beyanConfig.varisbildirimi) {
      this.form.addControl('idVarisBildirimi', new FormControl(0));
    } else if (this.beyanType == beyanConfig.cikisbildirimi) {
      this.form.addControl('idCikisBildirimi', new FormControl(0));
    }
    this.form.addControl(this.satirService.ugranilanUlkelerListName, this._fb.array([]));
    this.form.addControl(this.satirService.tasimaSatirListName, this._fb.array([]));
    this.form.addControl(this.satirService.ihracatListName, this._fb.array([]));
    this.defaultValues = this.form.getRawValue();

    // group.addControl('senetSiraNo', new FormControl(null));


    this.form.get('senetSiraNo').valueChanges.subscribe(siraNo => {
      if (isNullOrUndefined(siraNo)) return;
      let selectTasimaSenet = this.tasimaSenetList.get(siraNo);
      if (selectTasimaSenet) {
        let cloned = deepCopy(selectTasimaSenet);
        this.patchForm(cloned);
      } else {
        let cloned = deepCopy(this.defaultValues);
        cloned.senetSiraNo = siraNo;
        this.patchForm(cloned);
      }
    });
  }

  isEditting(senetSiraNo) {
    let editting = this.dirtyList.get(senetSiraNo);
    return isNullOrUndefined(editting) ? false : editting;
  }

  loadData(idOzetbeyan: number) {
    if (!this.form) this.initForm();
    this.tasimaSenetList = new Dictionary();
    this.dirtyList = new Dictionary();
    if (isNaN(idOzetbeyan)) return;
    this.idOzetbeyan = idOzetbeyan;
    if (this.beyanType == beyanConfig.ozetbeyan) {
      this.defaultValues.idOzetBeyan = idOzetbeyan;
      this.form.patchValue({idOzetBeyan: idOzetbeyan});
    } else if (this.beyanType == beyanConfig.varisbildirimi) {
      this.defaultValues.idVarisBildirimi = idOzetbeyan;
      this.form.patchValue({idVarisBildirimi: idOzetbeyan});
    } else if (this.beyanType == beyanConfig.cikisbildirimi) {
      this.defaultValues.idCikisBildirimi = idOzetbeyan;
      this.form.patchValue({idCikisBildirimi: idOzetbeyan});
    }
    this._service.getTasimaSenetFromOzetbeyan(idOzetbeyan, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        // this.tasimaSenetTab.setOzetBeyanNo(this.ozetBeyan.tescilNo);
        if (res.data && res.data.length > 0) {
          let tasimaSenetList = res.data.sort(this.sortTasimaSenet);
          tasimaSenetList.forEach(senet => {
            this.tasimaSenetList.addOrUpdate(senet.senetSiraNo, senet);
          });
          if (this.tasimaSenetList.keys().length > 0) {
            this.patchForm(this.tasimaSenetList.values()[0]);
          }
        }
      }
      setTimeout(() => this.dirtySubscriber(), 500);
    });
  }

  onDelete() {
    let ths = this;
    this._nf.removeConfirm(() => {
      return this._service.deleteTasimaSenet(this.form.value.id);
    }, this.loadData.bind(this), this.idOzetbeyan);
  }

  onSave() {
    let val = this.getData();
    let ths = this;
    this._service.saveTasimaSenet(val, this.loadingContext()).subscribe(
      res => {
        if (res.isSuccess) {
          ths._nf.showDinazorResultMessage(res);
          this.loadData(this.idOzetbeyan);
        } else {
          ths._nf.showDinazorResultMessage(res);
        }
      }
    );
  }

  onSubmit() {
    // if (!isNullOrUndefined(this.tescilNo) && this.tescilNo != '-1' && this.tescilNo.indexOf('IM') > 0) {
    //   this.nfService.showWarning('Tescil edilmiş veri güncellenemez!');
    //   return;
    // }
    this.isEdit ? this.onUpdate() : this.onSave();
  }

  onUpdate() {
    let val = this.getData();
    let ths = this;
    this._service.updateTasimaSenet(val, this.loadingContext()).subscribe(
      res => {
        if (res.isSuccess) {
          ths._nf.showDinazorResultMessage(res);
          this.loadData(this.idOzetbeyan);
        } else {
          ths._nf.showDinazorResultMessage(res);
        }
      }
    );
  }

  resetForm() {
    const id = this.form.get('id').value;
    this.form.reset(this.defaultValues, {emitEvent: false});
    this.form.patchValue({id: id}, {emitEvent: false});
    this.form.controls[this.satirService.ugranilanUlkelerListName] = this._fb.array([]);
    this.form.controls[this.satirService.tasimaSatirListName] = this._fb.array([]);
    this.form.controls[this.satirService.ihracatListName] = this._fb.array([]);
  }

  satirEkle() {
    this.resetForm();
    if (this.tasimaSenetList.keys().length == 0) {
      this.defaultValues.senetSiraNo = 1;
    } else {
      this.defaultValues.senetSiraNo = ((+this.tasimaSenetList.keys()[this.tasimaSenetList.keys().length - 1]) + 1) + '';
    }
    this.dirtyList.addOrUpdate(this.defaultValues.senetSiraNo, true);
    this.tasimaSenetList.addOrUpdate(this.defaultValues.senetSiraNo, deepCopy(this.defaultValues));
    this.patchForm(this.defaultValues);
  }

  private dirtySubscriber() {
    if (this.isDirtySubscribe === true) return;
    this.form.valueChanges.subscribe(_ => {
      this.refreshCache();
      let curSenetSiraNo = this.form.getRawValue().senetSiraNo;
      if (isNullOrUndefined(curSenetSiraNo)) return;
      this.dirtyList.addOrUpdate(curSenetSiraNo, true);
    });
    this.isDirtySubscribe = true;
  }

  private getData() {
    let val = deepCopy(this.form.getRawValue());
    let satirCount = 0;
    if (this.beyanType === beyanConfig.ozetbeyan) {
      val.tasimaSatirList.forEach(satir => {
        satirCount++;
        satir.satirNo = satirCount;
        let esyaCount = 0;
        satir.esyaSatirList.forEach(esya => {
          esyaCount++;
          esya.kalemSiraNo = esyaCount;
        });
      });
    } else if (this.beyanType === beyanConfig.varisbildirimi ||
      this.beyanType === beyanConfig.cikisbildirimi) {
      val[this.satirService.tasimaSatirListName].forEach(satir => {
        satirCount++;
        satir.satirNo = satirCount;
      });
    }
    return val;
  }

  private patchForm(tasimaSenet: any): void {

    this.resetForm();
    let cloned = deepCopy(tasimaSenet);
    delete cloned[this.satirService.ugranilanUlkelerListName];
    delete cloned[this.satirService.tasimaSatirListName];
    delete cloned[this.satirService.ihracatListName];
    this.form.patchValue(cloned, {emitEvent: false});
    this._satirService.setIdTasimaSenet(tasimaSenet.id);
    if (tasimaSenet[this.satirService.ugranilanUlkelerListName]) {
      tasimaSenet[this.satirService.ugranilanUlkelerListName].forEach((ugranilanUlke) => {
        this.satirService.addUgranilanUlkeSatir(this.form, false, ugranilanUlke);
      });
    }
    if (tasimaSenet[this.satirService.tasimaSatirListName]) {
      tasimaSenet[this.satirService.tasimaSatirListName].forEach((tasimaSatir, tasimaSatirIndex) => {
        const satirGroup = this.satirService.addTasimaSatir(this.form, false, tasimaSatir);
        if (tasimaSatir[this.satirService.esyaSatirListName]) {
          tasimaSatir[this.satirService.esyaSatirListName].forEach((esyaSatir) => {
            this.satirService.addEsyaSatir(satirGroup, tasimaSatirIndex, false, esyaSatir);
          });
        }
      });
    }

    if (tasimaSenet[this.satirService.ihracatListName]) {
      tasimaSenet[this.satirService.ihracatListName].forEach((ihracat) => {
        this.satirService.addIhracatSatir(this.form, false, ihracat);
      });
    }
    setTimeout(() => {
      $('[id^=' + 'repeater' + ']').slideDown('fast');
    }, 300);
  }

  private refreshCache(): void {
    let senetSiraNo = this.form.get('senetSiraNo').value;
    if (this.tasimaSenetList.get(senetSiraNo)) {
      this.tasimaSenetList.addOrUpdate(this.form.get('senetSiraNo').value, this.form.getRawValue());
    }
  }

  private sortTasimaSenet(o1, o2): number {
    if (o1.senetSiraNo > o2.senetSiraNo) return 1;
    if (o1.senetSiraNo < o2.senetSiraNo) return -1;
    return 0;
  }

}
