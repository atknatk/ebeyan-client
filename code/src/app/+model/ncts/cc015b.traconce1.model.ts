/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class TRACONCE1Model {

  @DnXmlElementPascal()
  namCE17: string;

  @DnXmlElementPascal()
  strAndNumCE122: string;

  @DnXmlElementPascal()
  posCodCE123: string;

  @DnXmlElementPascal()
  citCE124: string;

  @DnXmlElementPascal()
  couCE125: string;

  @DnXmlElementPascal()
  nADLNGCE: string;

  @DnXmlElementPascal()
  tINCE159: string;


  constructor(options: {} = {}) {
    this.namCE17 = options['namCE17'];
    this.strAndNumCE122 = options['strAndNumCE122'];
    this.posCodCE123 = options['posCodCE123'];
    this.citCE124 = options['citCE124'];
    this.couCE125 = options['couCE125'];
    this.nADLNGCE = options['nADLNGCE'];
    this.tINCE159 = options['tINCE159'];
  }
}
