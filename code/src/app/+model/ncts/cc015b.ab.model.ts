/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElement } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { ACMA2Model } from './cc015b.ab.acma2.model';

export class ABModel extends ModelBase {

  @DnXmlElement('ACMA2')
  acma2: ACMA2Model[];


  constructor(options: {} = {}) {
    super();

    if (options['acma2']) {
      this.acma2 = Array<ACMA2Model>();
      options['acma2'].forEach(model => {
        this.acma2.push(new ACMA2Model(model));
      });
    }

  }
}
