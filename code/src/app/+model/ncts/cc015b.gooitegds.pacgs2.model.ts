/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class PACGS2Model extends ModelBase {

  @DnXmlElementPascal()
  marNumOfPacGS21: string;

  @DnXmlElementPascal()
  marNumOfPacGS21LNG: string;

  @DnXmlElementPascal()
  kinOfPacGS23: string;

  @DnXmlElementPascal()
  numOfPacGS24: number;

  @DnXmlElementPascal()
  numOfPieGS25: number;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
