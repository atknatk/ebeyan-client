/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { VALLIMECVLEModel } from './cc015b.guagua.guarefref.vallimecvle.model';
import { isNullOrUndefined } from '@dinazor/core';
import { VALLIMNONECLIMModel } from './cc015b.guagua.guarefref.vallimnoneclim.model';
import { isArray } from 'util';

export class GUAREFREFModel {

  @DnXmlElementPascal()
  guaRefNumGRNREF1: string;

  @DnXmlElementPascal()
  othGuaRefREF4: string;

  @DnXmlElementPascal()
  accCodREF6: string;

  @DnXmlElementPascal()
  curREF8: string;

  @DnXmlElementPascal()
  amoConREF7: number;

  @DnXmlElementPascal()
  vallimecvle: VALLIMECVLEModel;

  @DnXmlElementPascal()
  vallimnoneclim: VALLIMNONECLIMModel[];

  constructor(options: {} = {}) {
    this.guaRefNumGRNREF1 = options['guaRefNumGRNREF1'];
    this.othGuaRefREF4 = options['othGuaRefREF4'];
    this.accCodREF6 = options['accCodREF6'];
    this.curREF8 = options['curREF8'];
    this.amoConREF7 = options['amoConREF7'];
    this.vallimecvle = isNullOrUndefined(options['vallimecvle']) ? undefined : new VALLIMECVLEModel(options['vallimecvle']);

    if (options['vallimnoneclim'] && isArray(options['vallimnoneclim'])) {
      this.vallimnoneclim = Array<VALLIMNONECLIMModel>();
      options['vallimnoneclim'].forEach(model => {
        this.vallimnoneclim.push(model);
      });
    }
  }
}
