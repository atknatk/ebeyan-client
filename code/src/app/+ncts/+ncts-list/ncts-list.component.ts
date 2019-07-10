import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DnCrudBase,
  DnDatatableBase,
  DnDatatableColumnBase,
  DnLoadingBase,
  DnNotificationService,
  DnQuestionFormBase,
  DnQuestionRowBase,
  DnQuestionRowList,
  DnSelectQuestion,
  DnTextboxQuestion,
  Guid
} from '@dinazor/core';
import { NctsTescilService } from '../../gtb/tescil/gtb-ncts-tescil.service';

declare let $: any;

@Component({
  templateUrl: './ncts-list.component.html',
  styleUrls: ['./ncts-list.component.css'],
  providers: [NctsTescilService]
})
export class NctsListComponent extends DnLoadingBase implements OnInit, AfterViewInit {
  ths = this;
  model: any;
  @Input() sampleCrudData: DnCrudBase;
  hataList: string[];
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
  private tableId: string = 'ncts-table';

  constructor(private notificationService: DnNotificationService,
              private router: Router,
              private tescilService: NctsTescilService) {
    super();
    this.sampleCrudData = this.getOptions();
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
    let ths = this;
    let btns = this.getButtonClassList();
    $('#' + this.tableId).on('click', 'tr', function () {
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
          let _btns = ['.dn-tescil', '.dn-beyanname-edit', '.dn-beyanname-detay-edit',
            '.dn-kalem-edit', 'dn-antrepo-edit', '.dn-ozetbeyan-edit', '.dn-hareket-edit'];
          ths.showButtons(_datatable, btns);
          if (dtby.detayliBeyanHataList && dtby.detayliBeyanHataList.length > 0) {
            ths.showButtons(_datatable, ['.dn-hatalar']);
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.model = $('#error-dialog').dialog(this.simpleDialogOptions);
  }

  private addOrUpdateNavigate(dtby: any, route: string) {
    let ths = this;

    if (dtby) {
      ths.router.navigate(['/ncts/' + route], {queryParams: {idNctsBeyan: dtby.id}});
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Ncts\'i tablodan seçiniz', 'Veri Seç!');
    }
  }

  private edit(dtbyRow: any) {
    let ths = this;

    if (dtbyRow) {
      ths.router.navigate(['/ncts/ncts'], {queryParams: {idNctsBeyan: dtbyRow.id}});
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz NCTS Beyanını tablodan seçiniz', 'Veri Seç!');
    }
  }

  private getOptions() {
    let ths = this;
    return {
      restUrl: 'nctsbeyan',
      editForm: null,
      title: 'NCTS Beyan Listesi',
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
                  key: 'tescilNo',
                  label: 'Tescil No'
                })
              }),
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnSelectQuestion({
                  key: 'beyanSahibi.name',
                  label: 'Beyan Sahibi',
                  serviceUrl: 'firma'
                })
              }),
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnSelectQuestion({
                  key: 'tasiyiciFirma.name',
                  label: 'Taşıyıcı Firma',
                  serviceUrl: 'firma'
                })
              })
            ]
          })
        ]
      }),
      datatableOptions: new DnDatatableBase({
        id: this.tableId,
        columns: [
          new DnDatatableColumnBase({
            title: 'Ref ID',
            serverKey: 'refId',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'LRN',
            serverKey: 'lrn',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Rejim Türü',
            serverKey: 'nctsRejimCode',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Alıcı Firma',
            serverKey: 'aliciAd',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Gönderici Firma',
            serverKey: 'gondericiAd',

            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'İşlem Tarihi',
            serverKey: 'tescilTarihi',
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
          buttons: [
            {
              className: 'dn-tescil',
              text: 'Tescil',
              action: function (e, dt, node, config) {
                let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
                ths.imzalaVeTescilEt(ozby);
              }
            },
            {
              className: 'dn-beyanname-edit',
              text: 'Beyanname',
              action: function (e, dt, node, config) {
                ths.edit(ths.getRowData());
              }
            },
            {
              className: 'dn-beyanname-detay-edit',
              text: 'Beyanname Detay',
              action: function (e, dt, node, config) {
                ths.addOrUpdateNavigate(ths.getRowData(), 'ncts-detay');
              }
            },
            {
              className: 'dn-kalem-edit',
              text: 'Kalem',
              action: function (e, dt, node, config) {
                ths.addOrUpdateNavigate(ths.getRowData(), 'kalem');
              }
            },
            {
              className: 'dn-ozetbeyan-edit',
              text: 'Özet Beyan Açma',
              action: function (e, dt, node, config) {
                ths.addOrUpdateNavigate(ths.getRowData(), 'ozetbeyan');
              }
            },
            {
              className: 'dn-antrepo-edit',
              text: 'Antrepo Açma',
              action: function (e, dt, node, config) {
                ths.addOrUpdateNavigate(ths.getRowData(), 'antrepo');
              }
            },
            {
              className: 'dn-hareket-edit',
              text: 'Hareket Yanıtı',
              action: function (e, dt, node, config) {
                ths.addOrUpdateNavigate(ths.getRowData(), 'hareket');
              }
            },
            {
              className: 'dn-hatalar',
              text: 'Hata',
              action: function (e, dt, node, config) {
                ths.hatalar(ths.getRowData());
              }
            }, {
              className: 'dn-refresh',
              text: '<i class="fa fa-refresh"></i>',
              action: function (e, dt, node, config) {
                dt.ajax.reload();
              }
            }
          ]
        },
        class: '',
        editButton: false,
        deleteButton: false,
        refreshButton: true,
        restUrl: 'nctsbeyan/simplepaging',
        afterInit: (datatable) => {
          let btns = this.getButtonClassList();
          this.hideButtons(datatable, btns);
        }
      }),
    };
  }

  private hatalar(ozbyRow: any) {
    let ths = this;

    if (ozbyRow) {
      this.hataList = ozbyRow.beyanIslemCagirHataList;
      this.model.dialog('open');
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz Ncts Beyan tablodan seçiniz', 'Veri Seç!');
    }
  }

  private hideButtons(datatable: any, btnClasses: string[]) {
    btnClasses.forEach(btnClass => {
      $(datatable.buttons([btnClass])[0].node).hide();
    });
  }

  private imzalaVeTescilEt(data: any) {
    if (data.sonuc === 'Tescil Başarılı') {
      this.notificationService.showWarning('Tescil edilmiş beyanı tekrar tescil edemezsiniz.');
    } else if (data.sonuc === 'Tescil İşlemde') {
      this.notificationService.showWarning('Tescil işlemindeki beyanı tekrar tescil edemezsiniz.');
    } else {
      this.tescilService.test(data, this);
    }
    // this.tescilService.tescilVarisBildirimi(varisRow);
  }

  private showButtons(datatable: any, btnClasses: string[]) {
    btnClasses.forEach(btnClass => {
      $(datatable.buttons([btnClass])[0].node).show();
    });
  }
}
