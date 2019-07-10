/**
 * Created by cabbar on 03.05.2017.
 */
import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DnHttpService,
  DnLoadingBase,
  DnNotificationService,
  DnSelect2Component,
  DnSelect2SmartContainerComponent,
  Guid,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';
import { GtbUtils } from '../../gtb/services/gtb-utils';
import { DnValidation } from '../../shared/utils/validation/dn-validation';
import { GtbSelectItem } from '../model/gtb-select-item-base';
import { DetayliBeyanValidationService } from './detaylibeyan-validations.service';


declare let $: any;

@Component({
  selector: 'app-detaylibeyan',
  templateUrl: './detaylibeyan.component.html',
  styleUrls: ['./detaylibeyan.component.css']
})
export class DetaylibeyanComponent extends DnLoadingBase implements OnInit, AfterViewInit {

  dbForm: FormGroup;
  detayliBeyan: any = {};
  idDetayliBeyan: number = NaN;
  public isRequesting: boolean;
  public loading = false;
  gtbConst = gtbConst;
  firmaDialog: any;
  showFooter = true;

  @ViewChildren('firma') firmaSelectComponenents: any;

  constructor(private _fb: FormBuilder,
              private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private route: ActivatedRoute,
              private _validation: DnValidation,
              private _http: DnHttpService<any>,
              private gtbUtils: GtbUtils,
              private _beyanValidation: DetayliBeyanValidationService) {
    super();
    this.isRequesting = true;
  }

  get isEdit(): boolean {
    return this.dbForm.get('id').value != 0;
  }

  get isShowButtons(): boolean {
    return !isNaN(this.idDetayliBeyan);
  }

  ngAfterViewInit(): void {
    this.afterInit();
    this.dbForm.get('finansalveBankacilikVerileri').valueChanges.subscribe(val => {
      if (isNullOrUndefined(val)) {
        this.dbForm.get('finansalveBankacilikVerileriDetay').setValue('');
      } else {
        this.dbForm.get('finansalveBankacilikVerileriDetay').setValue(val.name);
      }
    });

    const func2: string = `return [{"formControlName":"rejimKod","baseValidation":{"required":true,"disabled":false},"conditions":[{"value":item => item && item === '1000',"validations":[{"formControlName":"basitlestirilmisUsulKod","baseValidation":{"required":true,"disabled":false},"conditions":[{"value":item => item && item === '2',"validations":[{"formControlName":"asilSorumluFirma","baseValidation":{"required":true,"disabled":false},"conditions":[]}]}]}]}]}]`;
    const func: string = `
    const validations = [];
    // Rejim Kod
    const rejimKod ={
      formControlName: 'rejimKod',
      baseValidation: {
        required: true,
        disabled: false
      },
      conditions: []
    };
    rejimKod.conditions.push({
      value: item => item && item === '1000',
      validations: [
        {
          formControlName: 'basitlestirilmisUsulKod',
          baseValidation: {required: true, disabled: false},
          conditions: [{
            value: item => item === '1',
            validations: [
              {
      formControlName: 'asilSorumluFirma',
      baseValidation: {
        required: true,
        disabled: false
      },
      conditions: []
    }
            ]
          }]
        }
      ]
    });
    validations.push(rejimKod);
    // END Rejim Kod
    return validations;`;
    console.log(func2);
    const result = new Function(func2)();
    console.log(result);
    this._validation.initializeValidation(this.dbForm, result);
    this._validation.initializeValidation(this.dbForm, this._beyanValidation.getValidations());
    // console.log(JSON.stringify(this._beyanValidation.getValidations()));

    // this.initializeValidation();
  }

  ngOnInit() {
    this.loading = true;
    this.dbForm = this._fb.group({
      refId: [{value: null, disabled: true}],
      refSuffix: [{value: null, disabled: true}],
      aciklamalar: [{value: null}],
      tescilNo: [{value: null}]
      /* cikisSuresi: [{value: null, disabled: true}],
       rejimBitisTarihi: [{value: null, disabled: true}],
       gumrukIdaresiAciklama: [{value: null, disabled: true}],
       gumrukIdaresiCiktiSeriNo: [{value: null, disabled: true}],
       tescilTarih: [{value: null, disabled: true}],
       onayTarih: [{value: null, disabled: true}],
       kapanmaTarih: [{value: null, disabled: true}],
       referansTarih: [{value: null, disabled: true}],
       birlikKayitNo: [{value: null, disabled: true}],
       birlikKripto: [{value: null, disabled: true}],*/
    });

    this.dbForm.addControl('id', new FormControl(0));
    /*    let fields = this.control().fields;
     for (let props in fields) {
     if (fields.hasOwnProperty(props)) {
     this.dbForm.get(props).valueChanges.subscribe(val => {
     /!*if (isObject(val) && val.id == fields[prop]) {

     }*!/
     });
     }
     }*/
    this.firmaDialog = $('#firma-dialog').dialog(this.getDialogOptions());
  }

  onSubmit() {
    if (this.isEdit) {
      this.editDetayliBeyan();
    } else {
      this.saveDetayliBeyan();
    }
  }

  openModal() {
    console.log('Modal open');
    this.firmaDialog.dialog('open');
    const a = this._http;
  }

  refreshFirma(event) {
    if (isNullOrUndefined(this.firmaSelectComponenents)) return;
    this.firmaSelectComponenents.toArray().forEach((item: DnSelect2SmartContainerComponent) => {
      (item.getSelect2() as DnSelect2Component<any>).loadData();
    });
  }

  /*
    sinirdakiAracinKimligiBlur() {
      const onFg: AbstractControl = this.dbForm.get('cikistakiAracinTasimaAraciAdi');
      if (isNullOrUndefined(onFg.value)) return;
      const fg = this.dbForm.get('sinirdakiAracinTasimaAraciAdi');
      if (isNullOrUndefinedOrEmpty(fg.value))
        fg.setValue(onFg.value);

    }*/

  private afterInit() {
    this.dbForm.get('rejimKod').valueChanges.subscribe(value => {
      if (isNullOrUndefined(value)) {
        return;
      }

      if (this.gtbUtils.isIhracat(value)) {
        setTimeout(() => this.dbForm.get('cikisUlkesi').setValue('052', {emitEvent: false}), 1000);
      } else {
        setTimeout(() => this.dbForm.get('gidecegiUlke').setValue('052', {emitEvent: false}), 1000);
      }
    });
    this.initTemporaryTescilNoOrDetayliBeyan();
    this.dbForm.get('cikistakiAracinTasimaAraciKodu').valueChanges.subscribe(item => {
      if (isNullOrUndefined(item)) return;
      const fg = this.dbForm.get('sinirdakiAracinTasimaAraciKodu');
      if (isNullOrUndefinedOrEmpty(fg.value))
        fg.setValue(item);
    });

    this.dbForm.get('cikistakiAracinUlkesi').valueChanges.subscribe(item => {
      if (isNullOrUndefined(item)) return;
      const fg = this.dbForm.get('sinirdakiAracinUlkesi');
      if (isNullOrUndefinedOrEmpty(fg.value))
        fg.setValue(item);
    });
  }

  private editDetayliBeyan() {
    let val = this.dbForm.getRawValue();
    this.dnHttp.put(val, 'detaylibeyanv2', this.loadingContext()).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  private getDialogOptions(): any {
    return {
      autoOpen: false,
      resizable: false,
      modal: true,
      closeText: '',
      title: 'Firma Kaydet Listesi',
      /*  buttons: [{
          html: 'Kapat',
          click: function () {
            $(this).dialog('close');
          }
        }]*/
    };
  }

  private initDetayliBeyanData(idDetayliBeyan: number) {
    this.dnHttp.get('detaylibeyanv2/' + idDetayliBeyan).subscribe(res => {
      if (res.isSuccess) {
        this.detayliBeyan = res.data;
        this.dbForm.patchValue(this.detayliBeyan);
        this.isRequesting = false;
        this.loading = false;

        if (isNullOrUndefinedOrEmpty(this.dbForm.get('tescilNo').value)) {
        } else {
          this.showFooter = false;
          for (let prop in this.dbForm.controls) {
            if (this.dbForm.controls.hasOwnProperty(prop)) {
              this.dbForm.get(prop).disable({emitEvent: false});
            }
          }
        }
      }
    });
  }

  private initTemporaryTescil() {
    let refId;
    let refSuffix;
    this.dnHttp.get('TemporaryTransaction/DetayliBeyan').subscribe(res => {
      if (res.isSuccess) {
        refSuffix = res.data['value'] + '';
        refId = res.data['key'] + this.pad(refSuffix, 8);
      } else {
        refId = Guid.newGuid();
      }
      this.dbForm.reset({refId: refId, refSuffix: refSuffix, id: 0});
      this.loading = false;
    });
  }

  private initTemporaryTescilNoOrDetayliBeyan() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        if (isNaN(this.idDetayliBeyan)) {
          this.initTemporaryTescil();
        } else {
          this.initDetayliBeyanData(this.idDetayliBeyan);
        }
      });
  }

  private pad(n, width, z?) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  private saveDetayliBeyan() {
    let val = this.dbForm.getRawValue();
    this.dnHttp.post(val, 'detaylibeyanv2').subscribe(res => {
      this.dbForm.patchValue({id: res.objectId});
      this.idDetayliBeyan = res.objectId;
      this.notificationService.showDinazorResultMessage(res);
    });
  }


}
