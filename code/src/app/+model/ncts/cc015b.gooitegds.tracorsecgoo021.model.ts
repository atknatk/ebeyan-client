/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACORSECGOO021Model extends ModelBase {

  @DnXmlElementPascal()
  namTRACORSECGOO025: string;

  @DnXmlElementPascal()
  strNumTRACORSECGOO027: string;

  @DnXmlElementPascal()
  posCodTRACORSECGOO026: string;

  @DnXmlElementPascal()
  citTRACORSECGOO022: string;

  @DnXmlElementPascal()
  couCodTRACORSECGOO023: string;

  @DnXmlElementPascal()
  tRACORSECGOO021LNG: string;

  @DnXmlElementPascal()
  tINTRACORSECGOO028: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
