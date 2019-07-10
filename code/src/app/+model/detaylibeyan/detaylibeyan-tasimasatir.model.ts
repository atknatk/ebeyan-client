import { DnXmlElement } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanTasimaSatirModel extends ModelBase {

  @DnXmlElement('Tasima_satir_no')
  tasimaSatirNo: string;

  @DnXmlElement('Ambar_kodu')
  ambarKodu: string;

  @DnXmlElement('Acilacak_miktar')
  acilacakMiktar: number;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }

}
