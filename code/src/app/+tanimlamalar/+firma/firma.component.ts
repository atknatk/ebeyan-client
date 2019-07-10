import { Component, Input, ViewChild } from '@angular/core';
import {
  DnCrudBase,
  DnCrudComponent,
  DnDatatableBase,
  DnDatatableColumnBase,
  DnHttpService,
  DnQuestionFormBase,
  DnQuestionLengthValidator,
  DnQuestionRequiredValidator,
  DnQuestionRowBase,
  DnQuestionRowList,
  DnSelectQuestion,
  DnTextboxQuestion,
  Guid
} from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';
import { gtbRoles } from '../../gtb/gtb-role-enum';

@Component({
  selector: 'gtb-tanimlamalar-firma',
  template: `
    <div id='content'>
      <dn-crud [crudData]='firmaCrudData'
               #crud
               (actionAfterEditEmitter)='actionAfterEdit($event)'
               (actionAfterDeleteEmitter)='actionAfterEdit($event)'></dn-crud>
    </div>
  `
})
export class FirmaComponent {

  @ViewChild('#crud') crudComponent: DnCrudComponent;

  @Input() firmaCrudData: DnCrudBase = {
    restUrl: 'firma',
    title: 'Firma Listesi',
    editForm: new DnQuestionFormBase({
      id: 'firma-crud',
      submitButtonLabel: 'Kaydet',
      questionRows: [
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'adiUnvani',
                label: 'Adı Ünvanı',
                type: 'text',
                validator: [
                  new DnQuestionRequiredValidator()
                ]
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'vergiNo',
                label: 'Vergi No',
                type: 'text',
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'cadsNo',
                label: 'Cadde Sokak No',
                type: 'text'
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'ilIlce',
                label: 'İl İlçe',
                type: 'text'
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'postaKodu',
                label: 'Posta Kodu',
                type: 'text',
                validator: [
                  new DnQuestionLengthValidator({
                    maxLength: 5,
                    minLength: 0
                  })
                ]
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnTextboxQuestion({
                key: 'fax',
                label: 'Fax',
                type: 'Text'
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 9,
              question: new DnSelectQuestion({
                key: 'ulke',
                label: 'Ülke',
                serviceUrl: 'ulke',
                displaySelect: gtbConst.displaySelect,
                selectedText: gtbConst.selectedText
              })
            })
          ]
        })
      ]
    }),
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
              rowSize: 6,
              question: new DnTextboxQuestion({
                key: 'adiUnvani',
                label: 'Adı Ünvanı'
              })
            }),
            new DnQuestionRowBase({
              rowSize: 6,
              question: new DnTextboxQuestion({
                key: 'vergiNo',
                label: 'Vergi no'
              })
            })
          ]
        }),
        new DnQuestionRowList({
          row: [
            new DnQuestionRowBase({
              rowSize: 6,
              question: new DnTextboxQuestion({
                key: 'cadsNo',
                label: 'Cadde Sokak No'
              })
            }),
            new DnQuestionRowBase({
              rowSize: 6,
              question: new DnTextboxQuestion({
                key: 'ilIlce',
                label: 'İl İlçe'
              })
            })
          ]
        })
      ]
    }),
    datatableOptions: new DnDatatableBase({
      columns: [
        new DnDatatableColumnBase({
          serverKey: 'adiUnvani',
          title: 'Adı Ünvanı',
          orderable: false
        }),
        new DnDatatableColumnBase({
          serverKey: 'vergiNo',
          title: 'Vergi no'
        }),
        new DnDatatableColumnBase({
          serverKey: 'cadsNo',
          title: 'Cadde Sokak No',
          hideInCrud: true
        })
        , new DnDatatableColumnBase({
          serverKey: 'ilIlce',
          title: 'İl İlce',
          hideInCrud: true
        })
        , new DnDatatableColumnBase({
          serverKey: 'ulkeName',
          title: 'Ülke',
          hideInCrud: true
        })
      ],
      option: {},
      editButton: true,
      deleteButton: true,
      editRole: gtbRoles.FirmaUpdate,
      deleteRole: gtbRoles.FirmaDelete
    }),
  };

  constructor(private _http: DnHttpService<any>) {

  }

  actionAfterEdit() {
    this._http.refreshCache('firma');
  }
}
