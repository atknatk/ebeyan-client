/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class ACMA2Model extends ModelBase {

  @DnXmlElementPascal()
  iddtext: string;

  @DnXmlElementPascal()
  nartnumart: string;

  @DnXmlElementPascal()
  nartnumart1: string;

  @DnXmlElementPascal()
  qamv: string;

  @DnXmlElementPascal()
  lamvecom: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
