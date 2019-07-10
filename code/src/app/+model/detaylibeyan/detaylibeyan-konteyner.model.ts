import {UlkeModel} from '../enum/ulke.model';
import { isNullOrUndefined } from '@dinazor/core';
import {DnXmlElement, DnXmlModel} from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanKonteynerModel {

  @DnXmlElement('Konteyner_No')
  konteynerNo: string;

  @DnXmlModel('id', 'Ulke_Kodu')
  ulke: UlkeModel;


  constructor(options: {} = {}) {
    this.konteynerNo = options['konteynerNo'];
    this.ulke = isNullOrUndefined(options['ulke']) ? undefined : new UlkeModel(options['ulke']);
  }

}
