/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACONCE2Model extends ModelBase {

  @DnXmlElementPascal()
  namCE27: string;

  @DnXmlElementPascal()
  strAndNumCE222: string;

  @DnXmlElementPascal()
  posCodCE223: string;

  @DnXmlElementPascal()
  citCE224: string;

  @DnXmlElementPascal()
  couCE225: string;

  @DnXmlElementPascal()
  nADLNGGICE: string;

  @DnXmlElementPascal()
  tINCE259: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
