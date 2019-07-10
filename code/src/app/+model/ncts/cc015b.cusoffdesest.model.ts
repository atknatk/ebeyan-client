/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class CUSOFFDESESTModel {

  @DnXmlElementPascal()
  refNumEST1: string;

  constructor(options: {} = {}) {
    this.refNumEST1 = options['refNumEST1'];
  }
}
