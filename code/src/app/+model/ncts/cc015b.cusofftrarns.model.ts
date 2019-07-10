/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class CUSOFFTRARNSModel {

  @DnXmlElementPascal()
  refNumRNS1: string;

  @DnXmlElementPascal()
  arrTimTRACUS085: number;

  constructor(options: {} = {}) {
    this.refNumRNS1 = options['refNumRNS1'];
    this.arrTimTRACUS085 = options['arrTimTRACUS085'];
  }
}
