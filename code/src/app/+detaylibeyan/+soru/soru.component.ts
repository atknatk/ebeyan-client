import { Component, EventEmitter, Input, Output } from '@angular/core';
import { deepCopy, DnHttpService, DnLoadingBase, DnNotificationService } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  selector: 'detaylibeyan-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.css']
})
export class DetaylibeyanSoruComponent extends DnLoadingBase {
  gtbConst = gtbConst;
  soruList = [];
  @Output('refreshDokumanEvent') refreshDokumanEvent = new EventEmitter();


  constructor(private dnHttpService: DnHttpService<any>,
              private _nf: DnNotificationService) {
    super();
  }

  _idDetaylibeyan: number;

  get idDetaylibeyan(): number {
    return this._idDetaylibeyan;
  }

  @Input('idDetaylibeyan')
  set idDetaylibeyan(val) {
    this._idDetaylibeyan = val;
    this.load();
  }

  load(): void {
    this.loading = true;
    this.dnHttpService.get('detaylibeyanv2/' + this.idDetaylibeyan + '/detaylibeyansoru').subscribe(res => {
      this.loading = false;
      if (res.isSuccess) {
        this.soruList = res.data;
      }
    });
  }

  reply(soru, cevap) {
    this.loading = true;
    const _soru = deepCopy(soru);
    _soru.cevap = cevap;
    this.dnHttpService.put(_soru, 'DetayliBeyanSoru/SoruWithDokuman').subscribe(res => {
      if (res.isSuccess) {
        this.load();
        if ((cevap == 'EVET' && _soru.evetDetayliBeyanSoruIstenenDokumanList.length > 0) ||
          (cevap == 'HAYIR' && _soru.hayirDetayliBeyanSoruIstenenDokumanList.length > 0)) {
          this.refreshDokumanEvent.emit();
        }
      } else {
        this.loading = false;
        this._nf.showError('Soruların cevabını kaydederken hata ile karşılaştık.', 'Soru Kayıt İşlemi');
      }
    });
  }


}

