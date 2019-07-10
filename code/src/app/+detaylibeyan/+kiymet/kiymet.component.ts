/**
 * Created by cabbar on 04.05.2017.
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, isNullOrUndefined } from '@dinazor/core';
import { BaseInputList } from '../../gtb/shared/input-list.base';
import { KalemFinansalTabComponent } from './finansal-tab/finansal-tab.component';
import { DetaylibeyanKiymetKalemComponent } from './kalem/kiymet-kalem.component';

declare let $: any;

@Component({
  templateUrl: './kiymet.component.html',
  styleUrls: ['./kiymet.component.css']
})
export class DetaylibeyanKiymetComponent extends BaseInputList implements OnInit, AfterViewInit {
  @ViewChild('kiymetkalem') private kiymetkalem: DetaylibeyanKiymetKalemComponent;
  private kiymetKalemDialog;
  private taahutnameMetniDialog;

  constructor(protected route: ActivatedRoute,
              protected dnHttp: DnHttpService<any>) {
    super('Detaylibeyan', 'idDetayliBeyan', 'DetaylibeyanKiymet', 'kiymetNo', route, dnHttp);
  }

  afterLoadInitializedData(data: any): void {
  }

  afterOnSaveOrUpdate(data: any): void {
  }

  fields(): any[] {
    return [
      {key: 'id', value: 0},
      {key: 'idDetayliBeyan', value: 0},
      {key: 'taahutname', value: false},
    ];
  }

  newKiymetKalem() {
    if (isNullOrUndefined(this.id) || this.id == 0) {
      this.notificationService.showWarning('Önce kıymeti kaydediniz!');
      return;
    }
    this.kiymetkalem.setIdDetayliBeyanKiymet(this.id);
    this.kiymetkalem.initialize();
    this.kiymetKalemDialog.dialog('open');
  }

  ngAfterViewInit(): void {
    this.afterInit();
  }

  ngOnInit() {
    this.initDialog();
  }

  openTaahutnameMetniDialog() {
    this.taahutnameMetniDialog.dialog('open');
  }

  private checkTaahutnameMetniDialog() {
    const formGroup = this.baseForm.get('taahutname');
    if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(formGroup.value)) {
      this.baseForm.patchValue({'taahutname': !formGroup.value});
    }
  }

  private getKiymetKalemDialogOptions(): any {
    let wWidth = $(window).width();
    let dWidth = wWidth * 0.9;
    if (dWidth > 1250) dWidth = 1250;
    return {
      autoOpen: false,
      width: dWidth + 'px',
      resizable: true,
      modal: true,
      closeText: '',
      title: 'Kıymet Kalem Listesi',
      /*  buttons: [{
          html: 'Kapat',
          click: function () {
            $(this).dialog('close');
          }
        }]*/
    };
  }

  private getTaahutnameMetni(): string {
    return `Gümrük kıymetinin tespiti ile ilgiii beyannameye ekleyeceğim kıymet bildirimini imzalamakla 
    beyanname ve eklerinde yer alan bilgi, belge, tutanak ve raporları gerçeğe uygun,
    doğru ve tam olarak beyan ettiğimi, gümrük idaresince sonradan talep edilecek, eşyanın
    gümrük kıymeti ile ilgili, ilave her türlü bilgi, belge, tutanak ve raporları da
    aynı sorumluluk bilinci içinde verceğimi, aksi halde gümrük mevzuatı ve genel hükümlere
    göre cezaya muhatap tutulacağımı kabul ve taahhüt ederim.`;
  }

  // Kıymet Kalem

  private getTaahutnameMetniDialogOptions(): any {
    return {
      autoOpen: false,
      width: '600px',
      resizable: false,
      modal: true,
      closeText: '',
      title: 'Taahütname Metni',
      buttons: [{
        html: 'Tamam',
        click: function () {
          $(this).dialog('close');
        }
      }]
    };
  }

  private getTaahutnameStyle() {
    const formGroup = this.baseForm.get('taahutname');
    if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(formGroup.value) && formGroup.value === true) {
      return {
        'font-weight': 'bold',
        'margin-top': '-3px'
      };
    } else {
      return {'margin-top': '-3px'};
    }
  }

  private initDialog() {
    this.kiymetKalemDialog = $('#kiymet-kalem-dialog').dialog(this.getKiymetKalemDialogOptions());
    this.taahutnameMetniDialog = $('#taahutname-metni-dialog').dialog(this.getTaahutnameMetniDialogOptions());
  }
}
