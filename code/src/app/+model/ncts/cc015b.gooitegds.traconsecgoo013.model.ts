/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class TRACONSECGOO013Model extends ModelBase {

  @DnXmlElementPascal()
  namTRACONSECGOO017: string;

  @DnXmlElementPascal()
  strNumTRACONSECGOO019: string;

  @DnXmlElementPascal()
  posCodTRACONSECGOO018: string;

  @DnXmlElementPascal()
  cityTRACONSECGOO014: string;

  @DnXmlElementPascal()
  couCodTRACONSECGOO015: string;

  @DnXmlElementPascal()
  tRACONSECGOO013LNG: string;

  @DnXmlElementPascal()
  tINTRACONSECGOO020: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
