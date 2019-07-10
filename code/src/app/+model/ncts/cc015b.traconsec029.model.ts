/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACONSEC029Model extends ModelBase {

  @DnXmlElementPascal()
  nameTRACONSEC033: string;

  @DnXmlElementPascal()
  strNumTRACONSEC035: string;

  @DnXmlElementPascal()
  posCodTRACONSEC034: string;

  @DnXmlElementPascal()
  citTRACONSEC030: string;

  @DnXmlElementPascal()
  couCodTRACONSEC031: string;

  @DnXmlElementPascal()
  tRACONSEC029LNG: string;

  @DnXmlElementPascal()
  tINTRACONSEC036: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
