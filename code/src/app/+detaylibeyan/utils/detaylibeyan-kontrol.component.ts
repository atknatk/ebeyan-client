/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DnHttpService, DnNotificationService, isNullOrUndefined } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { TescilService } from '../../gtb/tescil/gtb-tescil.service';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  selector: 'detaylibeyan-kontrol-list',
  template: `
    <div *ngIf="isShowComponent()" class="col-sm-12 col-md-12 col-lg-12" style="height: 38px">
      <div class="btn-toolbar">
        <div class="btn-group">
          <button type="button" class="btn btn-default" (click)="imzalaTescilEt()">
            Tescil
          </button>
          <button type="button" class="btn btn-default" (click)="kontrolDetayliBeyan()">
            Kontrol
          </button>
          <button type="button" class="btn btn-default" (click)="copy()">
            Kopyala
          </button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default" (click)="kiymetOlustur()">
            Kıymet Oluştur
          </button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default" (click)="goruntule()">
            Görüntüle
          </button>
          <button type="button" class="btn btn-default" (click)="yazdir()">
            Yazdır
          </button>
        </div>
        <div class="btn-group">
          <button type="button" class="btn btn-default">
            Hata Listesi
          </button>
        </div>
      </div>
    </div>`,
  providers: [TescilService]
})
export class DetaylibeyanKontrolComponent {

  @Input() idDetayliBeyan: number;
  @Input() context: any;

  constructor(private tescilService: TescilService,
              private _nf: DnNotificationService,
              private _http: DnHttpService<any>,
              private router: Router) {

  }


  imzalaTescilEt() {
    if (isNullOrUndefined(this.idDetayliBeyan) || isNaN(this.idDetayliBeyan)) {
      this._nf.showWarning('Henüz beyanı kaydetmediniz. Önce beyanı kaydediniz');
    } else {
      this.tescilService.setLoadingContext(this.context);
      this.tescilService.tescilDetayliBeyanPin({id: this.idDetayliBeyan});
    }
  }

  private copy() {
    if (isNullOrUndefined(this.idDetayliBeyan) || isNaN(this.idDetayliBeyan)) {
      this._nf.showWarning('Henüz beyanı kaydetmediniz. Önce beyanı kaydediniz');
    } else {
      this._http.get(`DetayliBeyan/${this.idDetayliBeyan}/Copy`).subscribe(res => {
        //if(res.objectId)
        this._nf.showDinazorResultMessage(res);
      });
    }
  }

  private goruntule() {
    if (location.port == '4000') {
      this._http.get('pdf/detaylibeyan/' + this.idDetayliBeyan, {
        useApi: false
      }).subscribe(_ => console.log(_));
    } else {
      this.view();
    }
  }

  private isShowComponent(): boolean {
    return this.idDetayliBeyan && !isNaN(this.idDetayliBeyan);
  }

  private kiymetOlustur() {
    if (isNullOrUndefined(this.idDetayliBeyan) || isNaN(this.idDetayliBeyan)) {
      this._nf.showWarning('Henüz beyanı kaydetmediniz. Önce beyanı kaydediniz');
    } else {
      this.context.context.loading = true
      this._http.get('DetayliBeyanKiymet/KiymetOlustur?idDetayliBeyan=' + this.idDetayliBeyan).subscribe(res => {
        this.context.context.loading = false;
        this._nf.showDinazorResultMessage(res);
      });
    }
  }

  private kontrolDetayliBeyan() {
    if (isNullOrUndefined(this.idDetayliBeyan) || isNaN(this.idDetayliBeyan)) {
      this._nf.showWarning('Henüz beyanı kaydetmediniz. Önce beyanı kaydediniz');
    } else {
      this.tescilService.setLoadingContext(this.context);
      this.tescilService.kontrolDetayliBeyan(this.idDetayliBeyan, this.context);
    }
  }

  private view() {
    this.router.navigate(['/detaylibeyan/view'], {queryParams: {idDetayliBeyan: this.idDetayliBeyan}});
  }

  private yazdir() {
    if (location.port == '4000') {
      this._http.get('pdf/detaylibeyanbos/' + this.idDetayliBeyan, {
        useApi: false
      }).subscribe(_ => console.log(_));
    } else {
      this.view();
    }
  }

  private hatalar(ozbyRow: any) {
    let ths = this;

  /*  if (ozbyRow) {
      this.hataList = ozbyRow.detayliBeyanHataList;
      this.kriptoHataList = ozbyRow.kriptoError;

      this.errorDialog.dialog('open');
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Detaylı Beyanı tablodan seçiniz', 'Veri Seç!');
    }*/
  }
}
