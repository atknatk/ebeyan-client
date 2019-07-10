import { DnXmlElement } from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */

export class HavacilikYakitTuruModel {
  @DnXmlElement('VergiNumarasi')
  vergiNumarasi: string;

  @DnXmlElement('FaturaTarihi')
  faturaTarihi: Date;

  @DnXmlElement('FaturaNumarasi')
  faturaNumarasi: string;

  @DnXmlElement('ToplamFaturaMiktar')
  toplamFaturaMiktar: number;

  @DnXmlElement('YakitTuru')
  yakitTuru: string;

  constructor(options: {} = {}) {

    this.vergiNumarasi = options['vergiNumarasi'];
    this.faturaTarihi = options['faturaTarihi'];
    this.faturaNumarasi = options['faturaNumarasi'];
    this.toplamFaturaMiktar = options['toplamFaturaMiktar'];
    this.yakitTuru = options['yakitTuru'];
  }

}
