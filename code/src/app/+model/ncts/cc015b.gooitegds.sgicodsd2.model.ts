/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class SGICODSD2Model extends ModelBase {

  @DnXmlElementPascal()
  senGooCodSD22: number;

  @DnXmlElementPascal()
  senQuaSD23: number;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
