/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
export class REPREPModel {

  @DnXmlElementPascal()
  namREP5: string;

  @DnXmlElementPascal()
  repCapREP18: string;

  @DnXmlElementPascal()
  repCapREP18LNG: string;

  constructor(options: {} = {}) {
    this.namREP5 = options['namREP5'];
    this.repCapREP18 = options['repCapREP18'];
    this.repCapREP18LNG = options['repCapREP18LNG'];
  }
}
