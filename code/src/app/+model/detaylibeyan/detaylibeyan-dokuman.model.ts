import { isNullOrUndefined } from '@dinazor/core';
import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { SimpleDetaylibeyanKalemModel } from '../simple/simple-detaylibeyan-kalem.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanDokumanModel extends ModelBase {


  @DnXmlModel('kalemNo', 'Kalem_no')
  simpleDetayliBeyanKalem: SimpleDetaylibeyanKalemModel;

  @DnXmlElement('Kod')
  istenenDokuman: string;

  @DnXmlElement('Dogrulama')
  dogrulama: string;

  @DnXmlElement('Belge_tarihi')
  belgeTarihi: string;

  @DnXmlElement('Referans')
  referans: string;

  @DnXmlElement('Vize_Tarihi')
  vizeTarihi: string;


  constructor(options: {} = {}) {
    super();
    this.simpleDetayliBeyanKalem = isNullOrUndefined(options['simpleDetayliBeyanKalem']) ? undefined : new SimpleDetaylibeyanKalemModel(options['simpleDetayliBeyanKalem']);
    this.istenenDokuman = options['istenenDokuman'];
    if (options['dogrulama'] == 1) {
      this.dogrulama = 'V';
    } else if (options['dogrulama'] == 2) {
      this.dogrulama = 'S';
    }
    this.belgeTarihi = options['belgeTarihi'];
    this.referans = options['referans'];
    this.vizeTarihi = options['vizeTarihi'];

  }
}
