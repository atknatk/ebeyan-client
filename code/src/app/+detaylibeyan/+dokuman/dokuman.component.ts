import { AfterViewInit, Component, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnSelect2Component, isNullOrUndefined } from '@dinazor/core';
import Inputmask from 'inputmask/dist/inputmask/inputmask.date.extensions';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { isArray } from 'util';
import { gtbConst } from '../../gtb/gtb-const';
import { BaseDetayliBeyanList } from '../abstracts/base-list';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  templateUrl: './dokuman.component.html',
  styleUrls: ['./dokuman.component.css']
})
export class DetaylibeyanDokumanComponent extends BaseDetayliBeyanList implements OnDestroy, AfterViewInit {

  @ViewChildren('date') dates;
  @ViewChild('dokumanSelect') dokumanSelect: DnSelect2Component<any>;

  gtbConst = gtbConst;


  constructor(private dnHttpService: DnHttpService<any>,
              private activatedRoute: ActivatedRoute) {
    super('detayliBeyanDokumanList', 'detayliBeyanDokuman', activatedRoute, dnHttpService);
    //  this.initDateMask();

  }

  get kalemUrl() {
    return 'detaylibeyan/' + this.idDetayliBeyan + '/kalem/simple';
  }

  addRow(): FormGroup {
    const fg: FormGroup = super.addRow();

    try {
      setTimeout(this.initDateMask(), 5 * 1000);
    } catch (e) {
      console.log(e);
    }
    return fg;
  }

  fields(): any[] {
    return [
      {key: 'istenenDokuman'},
      {key: 'dogrulama'},
      {key: 'belgeTarihi'},
      {key: 'aciklama'},
      {key: 'referans'},
      {key: 'vizeTarihi'},
      {key: 'simpleDetayliBeyanKalem'},
      {key: 'id', value: 0}
    ];
  }

  ngAfterViewInit(): void {
    // this.baseForm.get('istenenDokuman').valueChanges.subscribe()
  }

  ngOnDestroy(): void {
    this.dnHttp.get(`DetayliBeyan/${this.idDetayliBeyan}/KontrolProductionForSoru`).subscribe();
  }

  onSubmit() {
    this.saveList();
  }

  refreshDokumanEvent() {
    this.loadData();
  }

  rowValueChangeEvent(fg: FormGroup): void {
    fg.get('istenenDokuman').valueChanges.subscribe(val => {
      if (isNullOrUndefined(val)) return;
      const aciklama = fg.get('aciklama');
      // if (isNullOrUndefinedOrEmpty(aciklama.value))
      if (!isNullOrUndefined(this.dokumanSelect)) {
        this.dokumanSelect.getService().getItems([val]).subscribe(item => {
          if (isArray(item) && item.length == 1) {
            fg.get('aciklama').setValue(item[0].name);
          }
        });
      }
    });

    fg.get('dogrulama').valueChanges.subscribe(val => {
      if (isNullOrUndefined(val)) return;
      if (val == 1) {
        fg.get('referans').enable();
        fg.get('belgeTarihi').enable();
        fg.get('vizeTarihi').enable();
      } else {
        fg.get('referans').disable();
        fg.get('belgeTarihi').disable();
        fg.get('vizeTarihi').disable();
      }
    });
    setTimeout(() => {
      try {
        this.initDateMask();
      } catch (e) {
      }
    }, 500);
  }

  private initDateMask() {
    let im = new Inputmask({
      alias: 'dd/mm/yyyy',
      showMaskOnHover: false,
      clearIncomplete: true
    });
    setTimeout(() => {
      this.dates.forEach(el => {
        im.mask(el.nativeElement);
      });
    }, 1000);
  }

}

