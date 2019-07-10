/**
 * Created by cabbar on 04.05.2017.
 */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  deepCopy,
  Dictionary,
  DnLoadingBase,
  DnNotificationService,
  IDictionary,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { IKalemBaseModel } from 'app/+detaylibeyan/+kalem/kalem-base-model';
import { DetayliBeyanKalemModel } from '../../+model/detaylibeyan/detaylibeyan-kalem.model';
import { gtbConst } from '../../gtb/gtb-const';
import { CurrencyService } from '../../gtb/services/currency';
import { DnValidation } from '../../shared/utils/validation/dn-validation';
import { DetayliBeyanKalemValidationService } from '../validation/kalem-validations.service';
import { DetaylibeyanKalemBaseComponent } from './base/base.component';
import { KalemFinansalTabComponent } from './finansal-tab/finansal-tab.component';
import { IKalemDefaultModel, KalemDefaultModel } from './kalem-default-model';
import { KalemService } from './kalem.service';
import { KalemListModalComponent } from './list-modal/kalem-list-modal.component';

declare let $: any;

@Component({
  templateUrl: './kalem.component.html',
  styleUrls: ['./kalem.component.css'],
  providers: [CurrencyService]
})
export class DetaylibeyanKalemComponent extends DnLoadingBase implements OnInit, AfterViewInit, OnDestroy {
  kalemList: IDictionary = new Dictionary();
  kalemArr: IKalemBaseModel[] = [];
  defaultValues: IKalemDefaultModel = new KalemDefaultModel();
  dbForm: FormGroup;
  @ViewChild('kalemListTemplate') private kalemListTemplate: KalemListModalComponent;
  gtbConst = gtbConst;
  idDetayliBeyan: number;
  showFooter = true;
  rejimKod: any;
  isEditting = false;
  latestKalemNo = 0;
  cache: Map<number, any> = new Map();
  @ViewChild('baseform') baseform: DetaylibeyanKalemBaseComponent;

  constructor(private _kalemService: KalemService,
              private _nf: DnNotificationService,
              private _validation: DnValidation,
              private route: ActivatedRoute,
              private _kalemValidation: DetayliBeyanKalemValidationService) {
    super();
  }

  get isDeletable(): boolean {
    return this.kalemList.keys().filter(key => key == this.kalemNo).length === 1;
  }

  get isEdit(): boolean {
    return this.kalemId != 0;
  }

  get kalemId(): number {
    return isNullOrUndefined(this.defaultValues) ? 0 : this.defaultValues.id;
  }

  get kalemNo(): any {
    return isNullOrUndefined(this.defaultValues) ? 1 : this.defaultValues.kalemNo;
  }

  getDetayliBeyanIdFromRoute() {
    this.loading = true;
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        if (!isNaN(this.idDetayliBeyan)) {
          this._kalemService.getRejimBsKod(this.idDetayliBeyan).subscribe(kod => {
            this.loading = false;
            if (kod.isSuccess) {
              const kodData: any = kod.data;
              this.defaultValues = {
                idDetayliBeyan: this.idDetayliBeyan,
                kalemNo: this.kalemNo,
                id: this.kalemId,
                teslimSekli: kodData.teslimSekli,
                rejimKod: kodData.rejimKod,
                bsKod: kodData.bsKod
              };

              if (!isNullOrUndefinedOrEmpty(kodData.tescilNo)) {
                this.baseform.setDisable();
              }

            } else {
              this._nf.showWarning('Rejim bilgisi alınamadı');
            }
          });

          this._kalemService.getSimpleDetaylibeyanKalemList(this.idDetayliBeyan).subscribe(skalem => {
            if (skalem.isSuccess) {
              this.kalemArr = [];
              skalem.data.forEach(l => this.kalemArr.push({
                id: l.id,
                kalemNo: l.kalemNo,
                gtip: l.gtip
              }));
              if (this.kalemArr.length == 0) {
                this.kalemArr.push({
                  id: 0,
                  kalemNo: 1,
                  gtip: null
                });
              }
              this.kalemArr.sort((a, b) => (a.kalemNo > b.kalemNo) ? 1 : ((b.kalemNo > a.kalemNo) ? -1 : 0));
              this.getKalem(this.kalemArr[0]);
            }
          });
        } else {
          this.loading = false;
        }
      });
  }

  getKalem(kalem: IKalemBaseModel) {
    this.loading = true;
    this.defaultValues.id = kalem.id;
    this.defaultValues.kalemNo = kalem.kalemNo;
    if (this.cache.has(+kalem.kalemNo)) {
      this.baseform.loadData(deepCopy(this.cache.get(+kalem.kalemNo)));
      this.cache.delete(+kalem.kalemNo);
    } else {
      this.baseform.loadData();
    }
    this.latestKalemNo = kalem.kalemNo;
  }


  getKalemWithSelect(kalem: IKalemBaseModel) {
    if (this.isEditting) {
      this._nf.confirm('Kalemi kaydetmediniz kaydetmeden devam etmek istiyor musunuz?', 'Onay', () => {
        this.cache.set(+this.baseform.dbForm.value.kalemNo, this.baseform.dbForm.value);
        this.getKalem(kalem);
      });
    } else {
      this.getKalem(kalem);
    }
  }

  getLabel(kalemNo: number) {
    const filtered = this.kalemArr.filter(l => l.kalemNo == kalemNo);
    if (filtered.length == 1) {
      return `${filtered[0].kalemNo} - ${isNullOrUndefined(filtered[0].gtip) ? 'GTİP' : filtered[0].gtip}`;
    }
    return 'HATA';
  }

  gtipChange(base: IKalemBaseModel) {
    for (let i = 0; i < this.kalemArr.length; i++) {
      if (this.kalemArr[i].kalemNo == base.kalemNo && base.gtip != this.kalemArr[i].gtip) {
        this.kalemArr[i].gtip = base.gtip;
      }
    }
  }

  kalemValueChange(kalem: DetayliBeyanKalemModel) {
    if (isNullOrUndefined(kalem)) return;
    if (this.latestKalemNo == kalem.kalemNo) {
      this.isEditting = true;
    }
    this.latestKalemNo = kalem.kalemNo;
  }

  loadedDone() {
    this.isEditting = false;
    this.loading = false;
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getDetayliBeyanIdFromRoute();
    //  this.initForm();
  }

  onRemove(kalem: DetayliBeyanKalemModel) {
    this.cache.delete(kalem.kalemNo);
    this.isEditting = false;
    const removed = this.kalemArr.filter(l => l.kalemNo != kalem.kalemNo);
    this.kalemArr = $.extend(true, [], removed);
    if (this.kalemArr.length == 0) {
      this.satirEkle();
    } else {
      this.getKalem(this.kalemArr[0]);
    }
  }

  onSubmit(kalem: DetayliBeyanKalemModel) {
    this.cache.delete(kalem.kalemNo);
    this.isEditting = false;
    const filtered = this.kalemArr.filter(l => l.kalemNo == kalem.kalemNo);
    filtered[0].id = kalem['id'];
  }

  satirEkle() {
    const kalem: IKalemBaseModel = {
      id: 0,
      kalemNo: this.kalemArr.length == 0 ? 1 : +this.getKalemNoSequences(),
      gtip: null
    };
    this.kalemArr.push(kalem);
    this.getKalem(kalem);
  }

  satirEkleWithConfirm() {
    if (this.isEditting) {
      this._nf.confirm('Kalemi kaydetmediniz kaydetmeden devam etmek istiyor musunuz?', 'Onay', () => {
        this.cache.set(+this.baseform.dbForm.value.kalemNo, this.baseform.dbForm.value);
        this.satirEkle();
      });
    } else {
      this.satirEkle();
    }
  }

  showKalemList() {
    this.kalemListTemplate.show(this.kalemList);
  }


  private getKalemNoSequences(): number {
    const length = this.kalemArr.length + 2;
    let no = 0;
    for (let i = 1; i < length; i++) {
      if (this.kalemArr.filter(l => l.kalemNo == i).length == 0) {
        no = i;
        break;
      }
    }
    return no;

  }
}
