import { isNullOrUndefined } from '@dinazor/core';
import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { SimpleDetaylibeyanKalemModel } from '../simple/simple-detaylibeyan-kalem.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanVergiModel extends ModelBase {

  @DnXmlModel('kalemNo', 'Kalem_no')
  simpleDetayliBeyanKalem: SimpleDetaylibeyanKalemModel;

  @DnXmlElement('Kod')
  kod: string;

  @DnXmlElement('Aciklama')
  aciklama: string;

  @DnXmlElement('Miktar')
  miktar: number;

  @DnXmlElement('Oran')
  oran: string;

  @DnXmlElement('Odeme_sekli')
  vergiOdemeSekil: string;

  @DnXmlElement('Vergi_matrahi')
  vergiMatrahi: number;

  constructor(options: {} = {}) {
    super();
    this.simpleDetayliBeyanKalem = isNullOrUndefined(options['simpleDetayliBeyanKalem']) ? undefined : new SimpleDetaylibeyanKalemModel(options['simpleDetayliBeyanKalem']);
    this.kod = options['kod'];
    this.aciklama = options['aciklama'];
    this.miktar = options['miktar'];
    this.oran = options['oran'];
    this.vergiOdemeSekil = options['vergiOdemeSekil'];
    this.vergiMatrahi = options['vergiMatrahi'];
  }

}
