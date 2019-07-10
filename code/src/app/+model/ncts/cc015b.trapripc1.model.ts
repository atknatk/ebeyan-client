/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRAPRIPC1Model extends ModelBase {

  @DnXmlElementPascal()
  namPC17: string;

  @DnXmlElementPascal()
  strAndNumPC122: string;

  @DnXmlElementPascal()
  posCodPC123: string;

  @DnXmlElementPascal()
  citPC124: string;

  @DnXmlElementPascal()
  couPC125: string;

  @DnXmlElementPascal()
  nADLNGPC: string;

  @DnXmlElementPascal()
  tINPC159: string;

  @DnXmlElementPascal()
  hITPC126: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
