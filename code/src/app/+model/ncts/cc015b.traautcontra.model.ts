/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class TRAAUTCONTRAModel {

  @DnXmlElementPascal()
  tINTRA59: string;

  constructor(options: {} = {}) {
    this.tINTRA59 = options['tINTRA59'];
  }
}
