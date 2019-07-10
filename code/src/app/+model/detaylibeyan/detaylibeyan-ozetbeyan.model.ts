import { DnXmlElement, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { DetayliBeyanOzetBeyanAcmaModel } from './detaylibeyan-ozetbeyan-acma.model';
import { DetayliBeyanTasimaSenetModel } from './detaylibeyan-tasimasenet.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanOzetBeyanModel extends ModelBase {

  @DnXmlElement('Ozetbeyan_no')
  ozetBeyanNo: string;

  @DnXmlElement('Ozetbeyan_islem_kapsami')
  ozetBeyanIslemKapsami: string;

  @DnXmlElement('Ambar_ici')
  isAmbarIci: string;

  @DnXmlElement('Baska_rejim')
  isBaskaRejim: string;

  @DnXmlElement('Aciklama')
  aciklama: string;

  @DnXmlElement('ozbyacma_bilgi')
  @DnXmlRoot('tasimasenetleri')
  detayliBeyanTasimaSenetList: DetayliBeyanTasimaSenetModel[];


  constructor(options: {} = {}) {
    super();
    this.equalizer(options, ['detayliBeyanTasimaSenetList']);

    if (options['isAmbarIci'] == 1) {
      this.isAmbarIci = 'EVET';
    } else if (options['isAmbarIci'] == 2) {
      this.isAmbarIci = 'HAYIR';
    }

    if (options['isBaskaRejim'] == 1) {
      this.isBaskaRejim = 'EVET';
    } else if (options['isBaskaRejim'] == 2) {
      this.isBaskaRejim = 'HAYIR';
    }

    if (options['detayliBeyanTasimaSenetList']) {
      this.detayliBeyanTasimaSenetList = Array<DetayliBeyanTasimaSenetModel>();
      options['detayliBeyanTasimaSenetList'].forEach(senetAcma => {
        this.detayliBeyanTasimaSenetList.push(new DetayliBeyanTasimaSenetModel(senetAcma));
      });
    }
  }

}
