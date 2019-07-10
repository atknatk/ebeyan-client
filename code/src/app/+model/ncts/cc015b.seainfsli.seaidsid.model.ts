/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
export class SEAIDSIDModel {

  @DnXmlElementPascal()
  seaIdeSID1: string;

  @DnXmlElementPascal()
  seaIdeSID1LNG: string;

  constructor(options: {} = {}) {
    this.seaIdeSID1 = options['seaIdeSID1'];
    this.seaIdeSID1LNG = options['seaIdeSID1LNG'];
  }
}
