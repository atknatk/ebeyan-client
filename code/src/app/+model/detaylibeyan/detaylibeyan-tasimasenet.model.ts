import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { SimpleTasimaSenetModel } from '../simple/simple-tasimasenet.model';
import { isNullOrUndefined } from '@dinazor/core';
import { DetayliBeyanTasimaSatirModel } from './detaylibeyan-tasimasatir.model';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanTasimaSenetModel {

  @DnXmlElement('Tasima_senedi_no')
  tasimaSenetNo: string;

  @DnXmlElement('tasimasatir_bilgi')
  @DnXmlRoot('tasimasatirlari')
  detayliBeyanTasimaSatirList: DetayliBeyanTasimaSatirModel[];

  constructor(options: {} = {}) {
    this.tasimaSenetNo = options['tasimaSenetNo'];

    if (options['detayliBeyanTasimaSatirList']) {
      this.detayliBeyanTasimaSatirList = Array<DetayliBeyanTasimaSatirModel>();
      options['detayliBeyanTasimaSatirList'].forEach(kalem => {
        this.detayliBeyanTasimaSatirList.push(new DetayliBeyanTasimaSatirModel(kalem));
      });
    }
  }

}
