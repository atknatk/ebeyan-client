/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class TRACONCO1Model {

  @DnXmlElementPascal()
  namCO17: string;

  @DnXmlElementPascal()
  strAndNumCO122: string;

  @DnXmlElementPascal()
  posCodCO123: string;

  @DnXmlElementPascal()
  citCO124: string;

  @DnXmlElementPascal()
  couCO125: string;

  @DnXmlElementPascal()
  nADLNGCO: string;

  @DnXmlElementPascal()
  tINCO159: string;


  constructor(options: {} = {}) {
    this.namCO17 = options['namCO17'];
    this.strAndNumCO122 = options['strAndNumCO122'];
    this.posCodCO123 = options['posCodCO123'];
    this.citCO124 = options['citCO124'];
    this.couCO125 = options['couCO125'];
    this.nADLNGCO = options['nADLNGCO'];
    this.tINCO159 = options['tINCO159'];
  }
}
