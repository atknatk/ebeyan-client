import { DnXmlElement } from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanMarkaModel {

  @DnXmlElement('Marka_Turu')
  markaTuru: string;

  @DnXmlElement('Marka_Tescil_No')
  markaTescilNo: string;

  @DnXmlElement('Marka_Adi')
  markaAdi: string;

  @DnXmlElement('Marka_Kiymeti')
  markaKiymeti: number;

  @DnXmlElement('Referans_No')
  referansNo: string;

  @DnXmlElement('Model_Yili')
  modelYili: string;

  @DnXmlElement('Model')
  model: string;

  @DnXmlElement('Motor_hacmi')
  motorHacmi: string;

  @DnXmlElement('Silindir_adedi')
  silindirAdedi: string;

  @DnXmlElement('Renk')
  renk: string;

  constructor(options: {} = {}) {
    this.markaTuru = options['markaTuru'];
    this.markaTescilNo = options['markaTescilNo'];
    this.markaAdi = options['markaAdi'];
    this.markaKiymeti = options['markaKiymeti'];
    this.referansNo = options['referansNo'];
    this.modelYili = options['modelYili'];
    this.model = options['model'];
    this.motorHacmi = options['motorHacmi'];
    this.silindirAdedi = options['silindirAdedi'];
    this.renk = options['renk'];
  }
}
