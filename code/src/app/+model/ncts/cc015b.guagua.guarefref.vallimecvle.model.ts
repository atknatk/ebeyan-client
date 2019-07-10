/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class VALLIMECVLEModel {

  @DnXmlElementPascal()
  notValForECVLE1: string;


  constructor(options: {} = {}) {
    this.notValForECVLE1 = options['notValForECVLE1'];
  }
}
