/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class CARTRA100Model extends ModelBase {

  @DnXmlElementPascal()
  namCARTRA121: string;

  @DnXmlElementPascal()
  strAndNumCARTRA254: string;

  @DnXmlElementPascal()
  posCodCARTRA121: string;

  @DnXmlElementPascal()
  citCARTRA789: string;

  @DnXmlElementPascal()
  couCodCARTRA587: string;

  @DnXmlElementPascal()
  nADCARTRA121: string;

  @DnXmlElementPascal()
  tINCARTRA254: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
