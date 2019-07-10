/**
 * Created by Cabbar on 10.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class PRODOCDC2Model extends ModelBase {

  @DnXmlElementPascal()
  docTypDC21: number;

  @DnXmlElementPascal()
  docRefDC23: string;

  @DnXmlElementPascal()
  docRefDCLNG: string;

  @DnXmlElementPascal()
  comOfInfDC25: string;

  @DnXmlElementPascal()
  comOfInfDC25LNG: string;


  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
