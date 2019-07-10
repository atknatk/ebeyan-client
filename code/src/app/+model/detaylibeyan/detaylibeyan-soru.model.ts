import { DnXmlElement, DnXmlIgnore } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanSoruModel extends ModelBase {

  @DnXmlElement('Soru_no')
  kod: string;

  @DnXmlIgnore()
  aciklama: string;

  @DnXmlElement('Kalem_no')
  kalemNo: string;

  @DnXmlElement('Cevap')
  cevap: string;

  constructor(options: {} = {}) {
    super();
    this.kod = options['kod'];
    this.aciklama = options['aciklama'];
    this.kalemNo = options['kalemNo'];
    this.cevap =  options['cevap'];
  }

}
