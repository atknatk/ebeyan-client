import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  DnAuthService,
  DnCrudBase,
  DnDatatableBase,
  DnDatatableColumnBase,
  DnHttpService,
  DnLoadingBase,
  DnNotificationService,
  DnQuestionFormBase,
  DnQuestionRowBase,
  DnQuestionRowList,
  DnStorageService,
  DnTextboxQuestion,
  Guid,
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@dinazor/core';
import { GtbUtils } from 'app/gtb/services/gtb-utils';
import { BsModalRef } from 'ngx-bootstrap';
import { gtbConst } from '../../gtb/gtb-const';
import { gtbRoles } from '../../gtb/gtb-role-enum';
import { TescilService } from '../../gtb/tescil/gtb-tescil.service';

declare let $: any;

@Component({
  templateUrl: './detaylibeyan-list.component.html',
  styleUrls: ['./detaylibeyan-list.component.css'],
  providers: [TescilService]
})
export class DetaylibeyanListComponent extends DnLoadingBase implements AfterViewInit {


  @Input() sampleCrudData: DnCrudBase;
  hataList: string[];
  kriptoHataList: string;
  loadingText = '';
  errorDialog: any;
  simpleDialogOptions = {
    autoOpen: false,
    width: 600,
    resizable: false,
    modal: false,
    closeText: '',
    title: 'Hata Listesi',
    buttons: [{
      html: 'Kapat',
      click: function () {
        $(this).dialog('close');
      }
    }]
  };

  public modalViewRef: BsModalRef;
  @ViewChild('viewTemplate') viewTemplate;


  private faturaUser;

  constructor(private notificationService: DnNotificationService,
              private http: DnHttpService<any>,
              private tescilService: TescilService,
              private auth: DnAuthService,
              private gtbUtils: GtbUtils,
              private storage: DnStorageService,
              private router: Router) {
    super();
    this.sampleCrudData = this.getOptions();
    this.faturaUser = storage.getItem(gtbConst.gtbFaturaUserKey);
  }

  copy(row, dt) {
    this.http.get(`DetayliBeyan/${row.id}/Copy`).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
      if (res.isSuccess) {
        dt.ajax.reload();
      }
    });
  }

  getButtonClassList(): string[] {
    let btns = this.sampleCrudData.datatableOptions.option['buttons'];
    let classList = [];
    btns.forEach(btn => {
      if (btn.className && btn.className != 'dn-refresh')
        classList.push('.' + btn.className);
    });
    return classList;
  }

  getRowData() {
    return this.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
  }

  ngAfterViewInit(): void {
    this.tescilService.setLoadingContext(this);
    let ths = this;
    let btns = this.getButtonClassList();
    $('#detayli-beyan-table').on('click', 'tr', function () {
      let _datatable: any = ths.sampleCrudData.datatableOptions.getDatatable();
      ths.hideButtons(_datatable, btns);
      if ($(this).hasClass('row-selected')) {
        $(this).removeClass('row-selected');
      } else {
        if (!_datatable) return;
        _datatable.$('tr.row-selected').removeClass('row-selected');
        $(this).addClass('row-selected');
        let dtby = _datatable.row('.row-selected').data();
        if (dtby) {
          let _btns = ['.dn-dtby-edit', '.dn-dtby-copy', '.dn-view'];
          if (isNullOrUndefinedOrEmpty(dtby.tescilNo)) {
            const thisBtn = [..._btns, ...['.dn-tescil', '.dn-kontrol', '.dn-kiymet', '.dn-hatalar']];
            $('.dn-dtby-edit').text('TCGB Düzenle');
            if (dtby.rejimKod && ths.gtbUtils.isIhracat(dtby.rejimKod.id)) {
              thisBtn.push('.dn-kripto');
            }
            ths.showButtons(_datatable, thisBtn);
          } else {
            $('.dn-dtby-edit').text('TCGB Detay');
            ths.showButtons(_datatable, _btns);
            ths.showButtons(_datatable, [..._btns, '.dn-hatbildir', '.dn-print']);
          }
        }

      }
    });
    $('#detayli-beyan-table tbody').on('dblclick', 'tr', function () {
      let _datatable: any = ths.sampleCrudData.datatableOptions.getDatatable();
      if (ths.auth.isAuthorized([gtbRoles.DetayliBeyanUpdate])) {
        const data = _datatable.row(this).data();
        ths.edit(data);
      }
    });
    this.errorDialog = $('#error-dialog').dialog(this.simpleDialogOptions);

  }

  onSubmit(payloadData) {
    console.log(payloadData);
  }

  private addOrUpdateNavigate(dtby: any, route: string) {
    let ths = this;

    if (dtby) {
      ths.router.navigate(['/detaylibeyan/' + route], {queryParams: {idDetayliBeyan: dtby.id}});
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Detaylı Beyanı tablodan seçiniz', 'Veri Seç!');
    }
  }

  private birlikOnay(dtby) {
    this.tescilService.setLoadingContext(this.loadingContext());
    this.tescilService.birlikOnay(dtby);
  }

  private edit(dtbyRow: any) {
    let ths = this;

    if (dtbyRow) {
      ths.router.navigate(['/detaylibeyan/detaylibeyan'], {queryParams: {idDetayliBeyan: dtbyRow.id}});
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Detaylı Beyanı tablodan seçiniz', 'Veri Seç!');
    }
  }

  private faturaDetayliBeyan(dtby) {
    if (isNullOrUndefined(dtby.rejimKod)) {
      this.notificationService.showWarning('Önce rejimi seçmelisiniz.');
      return;
    }

    if (dtby.rejimKod.id !== '1000') {
      this.notificationService.showWarning('Sadece ihracat beyanında E-Fatura oluşturabilirsiniz.');
      return;
    }

    if (isNullOrUndefined(this.faturaUser) || isNullOrUndefined(this.faturaUser.faturaPassword)) {
      this.notificationService.showWarning('E-Fatura Entegrason kaydınız eksik ya da bulunmamaktadır.');
      return;
    }
    this.notificationService.smartMessageBox({
      title: 'E-Fatura Oluştur',
      content: 'Seçili İhricat için E-Fatura oluşturmak istiyor musunuz?',
      buttons: '[HAYIR][EVET]'
    }, (result) => {
      if (result === 'EVET') {
        this.loading = true;
        this.http.get('Fatura/' + dtby.id).subscribe(res => {
          this.loading = false;
          this.notificationService.showDinazorResultMessage(res);
        });
      }
    });
  }

  private getButtuns(): any[] {
    const buttons = Array<any>();
    const ths = this;


    if (this.auth.isAuthorized([gtbRoles.DetayliBeyanTescil])) {
      buttons.push({
        className: 'dn-tescil',
        text: 'Tescil',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.imzalaVeTescilEt(ozby);
        }
      });

      buttons.push({
        className: 'dn-kontrol',
        text: 'Kontrol',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.kontrolDetayliBeyan(ozby);
        }
      });

      buttons.push({
        className: 'dn-kripto',
        text: 'Birlik Onay',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.birlikOnay(ozby);
        }
      });

      buttons.push({
        className: 'dn-kiymet',
        text: 'Kıymet Oluştur',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.kiymetOlustur(ozby);
        }
      });

      buttons.push({
        className: 'dn-fatura',
        text: 'E-Fatura Oluştur',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.faturaDetayliBeyan(ozby);
        }
      });

      /*  buttons.push({
          className: 'dn-hatbildir',
          text: 'Hat Bildir',
          action: function (e, dt, node, config) {
            let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
            ths.hatBildir(ozby);
          }
        });*/
    }

    if (this.auth.isAuthorized([gtbRoles.DetayliBeyanUpdate])) {
      buttons.push({
        className: 'dn-dtby-edit',
        text: 'TCGB Düzenle',
        action: function (e, dt, node, config) {
          ths.edit(ths.getRowData());
        }
      });

      buttons.push({
        className: 'dn-dtby-copy',
        text: 'Kopyala',
        action: function (e, dt, node, config) {
          ths.copy(ths.getRowData(), dt);
        }
      });


    }
    buttons.push({
      className: 'dn-view',
      text: 'Görüntüle',
      action: function (e, dt, node, config) {
        const dtby = ths.getRowData();
        if (location.port == '4000') {
          ths.http.get('pdf/detaylibeyan/' + dtby.id, {
            useApi: false
          }).subscribe(_ => console.log(_));
        } else {
          ths.view(ths.getRowData());
        }
        // ths.modalViewRef = ths.modalService.show(ths.viewTemplate);
      }
    });
    buttons.push({
      className: 'dn-view',
      text: 'Yazdır',
      action: function (e, dt, node, config) {
        const dtby = ths.getRowData();
        //   ths.view(ths.getRowData());
        ths.http.get('pdf/detaylibeyanbos/' + dtby.id, {
          useApi: false
        }).subscribe(_ => console.log(_));
        // ths.modalViewRef = ths.modalService.show(ths.viewTemplate);
      }
    });
    buttons.push({
      className: 'dn-hatalar',
      text: 'Hatalar',
      action: function (e, dt, node, config) {
        ths.hatalar(ths.getRowData());
      }
    });

    buttons.push({
      className: 'dn-refresh',
      text: '<i class="fa fa-refresh"></i>',
      action: function (e, dt, node, config) {
        dt.ajax.reload();
      }
    });


    return buttons;
  }

  private getOptions() {
    let ths = this;
    return {
      restUrl: 'detaylibeyan',
      editForm: null,
      title: 'Detaylı Beyan Listesi',
      searchForm: new DnQuestionFormBase({
        id: Guid.newGuid(),
        submitButtonEvent: 'onSubmit',
        submitButtonLabel: 'Ara',
        isSetupValidate: false,
        submitContainerStyle: [
          {
            key: 'backgroundColor',
            value: 'white'
          },
          {
            key: 'margin-left',
            value: '-10px'
          },
          {
            key: 'margin-right',
            value: '-10px'
          }
        ],
        questionRows: [
          new DnQuestionRowList({
            row: [
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnTextboxQuestion({
                  key: 'refId',
                  label: 'Ref ID'
                })
              }),
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnTextboxQuestion({
                  key: 'tescilNo',
                  label: 'Tescil No'
                })
              })
            ]
          })
        ]
      }),
      datatableOptions: new DnDatatableBase({
        id: 'detayli-beyan-table',
        columns: [
          new DnDatatableColumnBase({
            title: 'Ref ID',
            serverKey: 'refId',
            orderable: true
          }),
          new DnDatatableColumnBase({
            title: 'Tescil No',
            serverKey: 'tescilNo',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Rejim Türü',
            serverKey: 'rejimKod.id',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Alıcı Firma',
            serverKey: 'aliciIthalatciFirmaName',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Gönderici Firma',
            serverKey: 'gondericiIhracatciFirmaName',

            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'İşlem Tarihi',
            serverKey: 'tarih',
            orderable: false,
            // dateFormat: 'DD/MM/YYYY hh:ss'
          }),
          new DnDatatableColumnBase({
            title: 'İşlem Sonucu',
            serverKey: 'sonuc',
            orderable: false
          }),
        ],
        option: {
          buttons: this.getButtuns(),
          order: [[0, 'desc']],
          pageLength: 50
        },
        class: '',
        editButton: false,
        deleteButton: false,
        refreshButton: true,
        restUrl: 'detaylibeyan/simplepaging',
        afterInit: (datatable) => {
          let btns = this.getButtonClassList();
          this.hideButtons(datatable, btns);
        }
      }),
    };
  }

  private getXml(tescilXml) {
    return `<?xml version='1.0' encoding='utf-8'?>
    <Gelen xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema'>` +
      tescilXml
      + `</Gelen>`;
  }

  private hatBildir(dtby) {
    this.loading = true;
    this.http.get('DetayliBeyan/HatBildir?refId=' + dtby.refId).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
      this.loading = false;
    });
  }

  private hatalar(ozbyRow: any) {
    let ths = this;

    if (ozbyRow) {
      this.hataList = ozbyRow.detayliBeyanHataList;
      this.kriptoHataList = ozbyRow.kriptoError;

      this.errorDialog.dialog('open');
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Detaylı Beyanı tablodan seçiniz', 'Veri Seç!');
    }
  }

  private hideButtons(datatable: any, btnClasses: string[]) {
    btnClasses.forEach(btnClass => {
      $(datatable.buttons([btnClass])[0].node).hide();
    });
  }

  private imzalaVeTescilEt(ozbyRow: any) {
    this.tescilService.setLoadingContext(this.loadingContext());
    this.tescilService.soruDetayliBeyan(ozbyRow);
    // this.tescilService.tescilDetayliBeyan(ozbyRow);
  }

  private kiymetOlustur(dtby) {
    this.loading = true;
    this.http.get('DetayliBeyanKiymet/KiymetOlustur?idDetayliBeyan=' + dtby.id).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
      this.loading = false;
    });
  }

  private kontrolDetayliBeyan(dtby) {
    this.tescilService.setLoadingContext(this.loadingContext());
    this.tescilService.kontrolDetayliBeyan(dtby.id, this);
  }

  private showButtons(datatable: any, btnClasses: string[]) {
    btnClasses.forEach(btnClass => {
      $(datatable.buttons([btnClass])[0].node).show();
    });
  }

  private view(dtby) {
    this.router.navigate(['/detaylibeyan/view'], {queryParams: {idDetayliBeyan: dtby.id}});
  }
}
