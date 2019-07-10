import { DnXmlElement, DnXmlNamespace } from '../../shared/utils/dn-serialize';
import { CikisbildirimiBilgiModel } from './cikisbildirimi-bilgi.model';

export class CikisbildirimiModel {

  @DnXmlElement('RefID')
  refId: string;
  @DnXmlElement('KullaniciAdi')
  kullaniciAdi: string;
  @DnXmlElement('Sifre')
  sifre: string;
  @DnXmlElement('OzetBeyanBilgisi')
  @DnXmlNamespace("xmlns='http://www.gumruk.gov.tr/'")
  cikisbildirimi: CikisbildirimiBilgiModel;

  constructor(options: {} = {}) {
    this.refId = options['refId'];
    this.kullaniciAdi = options['kullaniciAdi'];
    this.sifre = options['sifre'];
    this.cikisbildirimi = new CikisbildirimiBilgiModel(options['cikisbildirimi']);
  }
}
