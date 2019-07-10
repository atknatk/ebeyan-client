import { DnXmlElement, DnXmlNamespace } from '../../shared/utils/dn-serialize';
import { OzetBeyanBilgiModel } from './ozetbeyan-bilgi.model';
export class OzetBeyanModel {

  @DnXmlElement('RefID')
  refId: string;

  @DnXmlElement('KullaniciAdi')
  kullaniciAdi: string;

  @DnXmlElement('Sifre')
  sifre: string;

  @DnXmlElement('OzetBeyanBilgisi')
  @DnXmlNamespace("xmlns='http://www.gumruk.gov.tr/'")
  ozetBeyan: OzetBeyanBilgiModel;

  constructor(options: {} = {}) {
    this.refId = options['refId'];
    this.kullaniciAdi = options['kullaniciAdi'];
    this.sifre = options['sifre'];
    this.ozetBeyan = new OzetBeyanBilgiModel(options['ozetBeyan']);
  }
}
