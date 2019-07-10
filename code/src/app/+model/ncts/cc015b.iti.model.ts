/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class ITIModel extends ModelBase {

  @DnXmlElementPascal()
  couOfRouCodITI1: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
