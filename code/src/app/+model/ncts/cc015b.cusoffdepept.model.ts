/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class CUSOFFDEPEPTModel {

  @DnXmlElementPascal()
  refNumEPT1: string;

  constructor(options: {} = {}) {
    this.refNumEPT1 = options['refNumEPT1'];
  }
}
