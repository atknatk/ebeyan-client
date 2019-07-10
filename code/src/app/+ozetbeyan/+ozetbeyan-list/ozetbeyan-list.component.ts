import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DnAuthService,
  DnCrudBase,
  DnDatatableBase,
  DnDatatableColumnBase,
  DnNotificationService,
  DnQuestionFormBase,
  DnQuestionRowBase,
  DnQuestionRowList,
  DnSelectQuestion,
  DnTextboxQuestion,
  Guid,
  isNullOrUndefined
} from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';
import { gtbRoles } from '../../gtb/gtb-role-enum';
import { TescilService } from '../../gtb/tescil/gtb-tescil.service';

declare let $: any;

@Component({
  template: `
    <div id="content">
      <dn-crud [crudData]="sampleCrudData"></dn-crud>
    </div>

    <div id="error-dialog">

      <ul>
        <li *ngFor="let item of hataList">
          {{item}}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host >>> .dt-buttons {
      float: left !important;
    }

    :host >>> .row-selected {
      background-color: paleturquoise !important;
    }
  `],
  providers: [TescilService]
})
export class OzetbeyanListComponent implements OnInit, AfterViewInit {


  gtbConst = gtbConst;
  @Input() sampleCrudData: DnCrudBase;
  hataList: string[];
  modal: any;

  constructor(private tescilService: TescilService,
              private notificationService: DnNotificationService,
              private auth: DnAuthService,
              private router: Router) {
    this.sampleCrudData = this.getOptions();
  }

  actionDelete() {

  }

  actionEdit() {

  }

  ngAfterViewInit(): void {
    let ths = this;
    $('#ozetbeyan-table').on('click', 'tr', function () {
      let _datatable: any = ths.sampleCrudData.datatableOptions.getDatatable();
      _datatable.buttons(['.dn-hatalar', '.dn-tescil', '.dn-ozby-edit', '.dn-senet-edit']).disable();

      if ($(this).hasClass('row-selected')) {
        $(this).removeClass('row-selected');
        if (!_datatable) return;
        _datatable.buttons(['.dn-hatalar', '.dn-tescil', '.dn-ozby-edit', '.dn-senet-edit']).disable();
      }
      else {
        if (!_datatable) return;
        _datatable.$('tr.row-selected').removeClass('row-selected');
        $(this).addClass('row-selected');
        let ozby = _datatable.row('.row-selected').data();
        if (ozby) {
          _datatable.buttons(['.dn-tescil', '.dn-ozby-edit', '.dn-senet-edit']).enable();
          if (ozby.beyanIslemCagirHataList && ozby.beyanIslemCagirHataList.length > 0) {
            _datatable.buttons(['.dn-hatalar']).enable();
          }
        }

      }
    });


  }

  ngOnInit() {
    this.modal = $('#error-dialog').dialog({
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
    });
  }

  onSubmit(payloadData) {
    console.log(payloadData);
  }

  private edit(ozbyRow: any) {
    let ths = this;
    if (ozbyRow) {
      ths.router.navigate(['/ozetbeyan/ozetbeyan', ozbyRow.id]);
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz veriyi tablodan seçiniz', 'Veri Seç!');
    }
  }

  private getButtuns(): any[] {
    const buttons = Array<any>();
    const ths = this;
    if (this.auth.isAuthorized([gtbRoles.OzetBeyanTescil])) {
      buttons.push({
        className: 'dn-tescil',
        text: 'İmzala ve Tescil Et',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.imzalaVeTescilEt(ozby);
        }
      });
    }

    if (this.auth.isAuthorized([gtbRoles.OzetBeyanUpdate])) {
      buttons.push({
        className: 'dn-ozby-edit',
        text: 'Özetbeyan',
        action: function (e, dt, node, config) {
          let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
          ths.edit(ozby);
        }
      });
    }

    buttons.push({
      className: 'dn-hatalar',
      text: 'Hatalar',
      action: function (e, dt, node, config) {
        let ozby = ths.sampleCrudData.datatableOptions.getDatatable().row('.row-selected').data();
        ths.hatalar(ozby);
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
      restUrl: 'ozetbeyan',
      editForm: null,
      title: 'Özet Beyan Listesi',
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
              }),
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnSelectQuestion({
                  key: 'beyanTuruCode',
                  label: 'Beyan Türü',
                  serviceUrl: 'beyanTuru',
                  displaySelect: ths.gtbConst.displaySelect,
                  selectedText: ths.gtbConst.selectedText,
                })
              })
            ]
          }),
          new DnQuestionRowList({
            row: [
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnSelectQuestion({
                  key: 'beyanSahibiName',
                  label: 'Beyan Sahibi',
                  serviceUrl: 'firma',
                  displaySelect: this.gtbConst.displaySelectFirma,
                  selectedText: this.gtbConst.selectedTextFirma,
                })
              }),
              new DnQuestionRowBase({
                rowSize: 4,
                question: new DnSelectQuestion({
                  key: 'tasiyiciFirmaName',
                  label: 'Taşıyıcı Firma',
                  serviceUrl: 'firma',
                  displaySelect: this.gtbConst.displaySelectFirma,
                  selectedText: this.gtbConst.selectedTextFirma,
                })
              })
            ]
          })
        ]
      }),
      datatableOptions: new DnDatatableBase({
        id: 'ozetbeyan-table',
        columns: [
          new DnDatatableColumnBase({
            title: 'Ref ID',
            serverKey: 'refId',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Tescil No',
            serverKey: 'tescilNo',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Beyan Sahibi',
            serverKey: 'beyanSahibiName',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Beyan Türü',
            serverKey: 'beyanTuruCode',
            orderable: false
          }),
          new DnDatatableColumnBase({
            title: 'Taşıyıcı Firma',
            serverKey: 'tasiyiciFirmaName',
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
          })
        ],
        option: {
          buttons: this.getButtuns()
        },
        class: '',
        editButton: false,
        deleteButton: false,
        refreshButton: true,
        restUrl: 'ozetbeyan/simplepaging'
      }),
    };
  }

  private hatalar(ozbyRow: any) {
    let ths = this;
    if (ozbyRow) {
      this.hataList = ozbyRow.beyanIslemCagirHataList;
      this.modal.dialog('open');
    } else {
      this.notificationService.showWarning('Önce işlem yapmak istediğiniz veriyi tablodan seçiniz', 'Veri Seç!');
    }
  }

  private imzalaVeTescilEt(ozbyRow: any) {
    if (isNullOrUndefined(ozbyRow.tescilNo)) {
      this.tescilService.tescilOzetbeyan(ozbyRow);
    } else {
      this.notificationService.showWarning('Zaten tescil edilmiştir.');
    }

  }


}
