import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  deepCopy,
  DnLoadingBase,
  DnNotificationService,
  DnSelect2Component,
  DnSelect2Item,
  DnSelect2SmartContainerComponent,
  Guid,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { gtbConst } from '../../../gtb-const';
import { IOzetbeyanService } from '../ozetbeyan-base.service';
import { beyanConfig } from '../ozetbeyan-shared.config';
import { RepeaterService } from '../repeater.service';


declare let $: any;

@Component({
  selector: 'gtb-ozetbeyan',
  templateUrl: './ozetbeyan.component.html'
})
export class OzetbeyanComponent extends DnLoadingBase implements OnInit, AfterViewInit {


  form: FormGroup;
  gtbConst = gtbConst;
  // @Input() idOzetBeyan: number = NaN;
  idEditingSubscribe: boolean = false;
  beyanConfig = beyanConfig;

  @Input() beyanType: number = NaN;
  @Output('saveOzetbeyanEvent') saveOzetbeyanEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('isEditing') isEditing: EventEmitter<any> = new EventEmitter<any>();
  @Output('beyanTuruChangedEvent') beyanTuruChangedEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('firma') firmaSelectComponenents: any;

  private lastBeyanTuru;
  private lastTasimaSekli: string;

  constructor(@Inject('IOzetbeyanService') private _service: IOzetbeyanService,
              private notificationService: DnNotificationService,
              private satirService: RepeaterService,
              private _fb: FormBuilder) {
    super();
    this.form = this._fb.group({
      id: [0],
      tescilNo: [null],
    });

  }

  get id(): number {
    return this.form.value.id;
  }

  get isEdit(): boolean {
    return this.id > 0;
  }

  get isTescil(): boolean {
    return !isNullOrUndefinedOrEmpty(this.form.value.tescilNo);
  }

  beyanTuruChanged(res: DnSelect2Item) {
    if (res.id.includes('İTH')) {
      this.form.patchValue({rejim: 'I'});
    } else if (res.id.includes('İHR')) {
      this.form.patchValue({rejim: 'E'});
    } else {
      this.form.patchValue({rejim: null});
    }
  }

  beyanTuruRemove(res) {
    this.form.patchValue({rejim: null});
  }

  getLimanUrl() {
    const val = this.form.getRawValue();
    if ((val && val.beyanTuru) && (val.beyanTuru.id == 'HAVİHR' || val.beyanTuru.id == 'HAVİTH')) {
      return 'havalimani';
    }

    if ((val && val.tasimaSekli) && (val.tasimaSekli.id == '40' || val.tasimaSekli.id == '40')) {
      return 'havalimani';
    }
    return 'limankod';
  }

  loadData(idOzetbeyan: number) {
    if (isNaN(idOzetbeyan)) {
      this._service.temporaryTransaction(this.loadingContext()).subscribe(res => {
        if (res.isSuccess) {
          this.form.patchValue({refId: res.data});
        } else {
          this.form.patchValue({refId: Guid.newGuid()});
        }
        setTimeout(() => this.subscribeEditing(), 300);
      });
    } else {
      this._service.getOzetbeyan(idOzetbeyan, this.loadingContext()).subscribe(res => {
        if (res.isSuccess) {
          this.patchForm(res.data);
          this.saveOzetbeyanEvent.emit(res.data);
        }
        setTimeout(() => this.subscribeEditing(), 300);
      });
    }
  }

  ngAfterViewInit(): void {
    this.beyanTuruChangedEvent();
  }

  ngOnInit() {
    if (this.beyanType !== 1)
      this.form.addControl(this.satirService.getVarisCikisLimaniSatirName(this.beyanType), this._fb.array([]));
  }

  refreshFirma(event) {
    if (isNullOrUndefined(this.firmaSelectComponenents)) return;
    this.firmaSelectComponenents.toArray().forEach((item: DnSelect2SmartContainerComponent) => {
      (item.getSelect2() as DnSelect2Component<any>).loadData();
    });
  }

  subscribeEditing() {
    if (!this.idEditingSubscribe) {
      this.form.valueChanges.subscribe(val => {
        this.isEditing.emit(true);
      });
      this.idEditingSubscribe = true;
    }
  }

  private beyanTuruChangedEvent() {
    if (isNullOrUndefined(this.form.get('beyanTuru'))) return;
    this.form.get('beyanTuru').valueChanges.subscribe(data => {
      if (isNullOrUndefinedOrEmpty(data)) {
        this.beyanTuruChangedEventEmitter.emit(data);
        this.lastBeyanTuru = data;
        return;
      }
      if (this.lastBeyanTuru === 'HAVİHR' || this.lastBeyanTuru === 'HAVİTH') {
        if (!(data.id === 'HAVİHR' || this.lastBeyanTuru === 'HAVİTH')) {
          this.beyanTuruChangedEventEmitter.emit(data.id);
        }
      } else {
        if (data.id === 'HAVİHR' || this.lastBeyanTuru === 'HAVİTH') {
          this.beyanTuruChangedEventEmitter.emit(data.id);
        }
      }
      this.lastBeyanTuru = data.id;
    });
  }

  private clear() {
    const refId = this.form.value.refId;
    this.form.reset({refId: refId});
  }

  private onSubmit() {
    if (this.isTescil) {
      this.notificationService.showWarning('Tescil edilmiş kayıt güncellenemez');
      return;
    }
    if (this.isEdit) {
      this.updateOzetBeyan(this.form.value);
    } else {
      this.saveOzetBeyan(this.form.value);
    }
  }

  private patchForm(data: any): void {
    if (isNullOrUndefined(data)) return;
    this.clear();

    let cloned = deepCopy(data);
    if (this.beyanType === beyanConfig.ozetbeyan) {
      this.form.patchValue(cloned, {emitEvent: false});
    } else {
      delete cloned[this.satirService.getVarisCikisLimaniSatirName(this.beyanType)];
      this.form.patchValue(cloned, {emitEvent: false});
      const ugranilanUlkelerData = data[this.satirService.getVarisCikisLimaniSatirName(this.beyanType)];
      if (ugranilanUlkelerData) {
        ugranilanUlkelerData.forEach((ugranilanUlke) => {
          this.satirService.addVarisCikisLimaniSatir(this.form, this.beyanType, this.id, false, ugranilanUlke);
        });
      }
    }
    setTimeout(() => {
      $('[id^=' + 'repeater' + ']').slideDown('fast');
    }, 300);
  }

  private saveOzetBeyan(data) {
    let ths = this;
    this._service.saveOzetbeyan(data, this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        this.form.patchValue({id: res.objectId});
        this.saveOzetbeyanEvent.emit(this.form.getRawValue());
        this.isEditing.emit(false);
      }
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  private updateOzetBeyan(data) {
    this._service.updateOzetbeyan(data, this.loadingContext()).subscribe(res => {
      this.saveOzetbeyanEvent.emit(data);
      this.isEditing.emit(false);
      this.notificationService.showDinazorResultMessage(res);
    });
  }
}
