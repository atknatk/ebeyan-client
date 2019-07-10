/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACORSEC037Model extends ModelBase {

  @DnXmlElementPascal()
  namTRACORSEC041: string;

  @DnXmlElementPascal()
  strNumTRACORSEC043: string;

  @DnXmlElementPascal()
  posCodTRACORSEC042: string;

  @DnXmlElementPascal()
  citTRACORSEC038: string;

  @DnXmlElementPascal()
  couCodTRACORSEC039: string;

  @DnXmlElementPascal()
  tRACORSEC037LNG: string;

  @DnXmlElementPascal()
  tINTRACORSEC044: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
