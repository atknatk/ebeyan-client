import { DnXmlElement, DnXmlNamespace } from '../../shared/utils/dn-serialize';
import { DetayliBeyanBilgiModel } from './detaylibeyan-bilgi.model';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanModel {

  @DnXmlElement('RefID')
  refId: string;

  @DnXmlElement('KullaniciAdi')
  kullaniciAdi: string;

  @DnXmlElement('Sifre')
  sifre: string;
  @DnXmlElement('BeyannameBilgi')
  @DnXmlNamespace('xmlns="http://tempuri.org/"')
  detayliBeyan: DetayliBeyanBilgiModel;

  constructor(options: {} = {}) {
    this.refId = options['refId'];
    this.kullaniciAdi = options['kullaniciAdi'];
    this.sifre = options['sifre'];
    this.detayliBeyan = new DetayliBeyanBilgiModel(options['detayliBeyan']);
  }
}
