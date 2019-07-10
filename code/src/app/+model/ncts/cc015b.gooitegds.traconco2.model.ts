/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACONCO2Model extends ModelBase {

  @DnXmlElementPascal()
  namCO27: string;

  @DnXmlElementPascal()
  strAndNumCO222: string;

  @DnXmlElementPascal()
  posCodCO223: string;

  @DnXmlElementPascal()
  citCO224: string;

  @DnXmlElementPascal()
  couCO225: string;

  @DnXmlElementPascal()
  nADLNGGTCO: string;

  @DnXmlElementPascal()
  tINCO259: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
