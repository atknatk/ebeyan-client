/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class ACMAModel extends ModelBase {

  @DnXmlElementPascal()
  disInd: string;

  @DnXmlElementPascal()
  idsoext: string;

  @DnXmlElementPascal()
  wareInd: string;

  @DnXmlElementPascal()
  ltitref: string;

  @DnXmlElementPascal()
  wareCod: string;

  @DnXmlElementPascal()
  titlNum: number;

  @DnXmlElementPascal()
  disQty: number;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
