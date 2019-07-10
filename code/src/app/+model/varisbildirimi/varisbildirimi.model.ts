import { DnXmlElement, DnXmlNamespace } from '../../shared/utils/dn-serialize';
import { VarisbildirimiBilgiModel } from './varisbildirimi-bilgi.model';
export class VarisbildirimiModel {

  @DnXmlElement('RefID')
  refId: string;
  @DnXmlElement('KullaniciAdi')
  kullaniciAdi: string;
  @DnXmlElement('Sifre')
  sifre: string;
  @DnXmlElement('OzetBeyanBilgisi')
  @DnXmlNamespace("xmlns='http://www.gumruk.gov.tr/'")
  varisbildirimi: VarisbildirimiBilgiModel;

  constructor(options: {} = {}) {
    this.refId = options['refId'];
    this.kullaniciAdi = options['kullaniciAdi'];
    this.sifre = options['sifre'];
    this.varisbildirimi = new VarisbildirimiBilgiModel(options['varisbildirimi']);
  }
}
