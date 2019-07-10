/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class VALLIMNONECLIMModel {

  @DnXmlElementPascal()
  notValForOthConPLIM2: string;


  constructor(options: {} = {}) {
    this.notValForOthConPLIM2 = options['notValForOthConPLIM2'];
  }
}
