/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class CONRESERSModel {

  @DnXmlElementPascal()
  conResCodERS16: string;

  @DnXmlElementPascal()
  datLimERS69: string;

  constructor(options: {} = {}) {
    this.conResCodERS16 = options['conResCodERS16'];
    this.datLimERS69 = options['datLimERS69'];
  }
}
