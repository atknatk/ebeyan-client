/**
 * Created by Cabbar on 10.07.2017.
 */
/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class PREADMREFAR2Model extends ModelBase {

  @DnXmlElementPascal()
  preDocTypAR21: number;

  @DnXmlElementPascal()
  preDocRefAR26: number;

  @DnXmlElementPascal()
  preDocRefLNG: string;

  @DnXmlElementPascal()
  comOfInfAR29: string;

  @DnXmlElementPascal()
  comOfInfAR29LNG: string;


  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
