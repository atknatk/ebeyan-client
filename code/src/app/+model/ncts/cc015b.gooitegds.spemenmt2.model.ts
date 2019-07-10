/**
 * Created by Cabbar on 10.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class SPEMENMT2Model extends ModelBase {

  @DnXmlElementPascal()
  addInfMT21: number;

  @DnXmlElementPascal()
  addInfMT21LNG: string;

  @DnXmlElementPascal()
  addInfCodMT23: string;

  @DnXmlElementPascal()
  expFroECMT24: string;

  @DnXmlElementPascal()
  expFroCouMT25: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
