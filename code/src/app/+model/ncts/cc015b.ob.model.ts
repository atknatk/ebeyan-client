/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElement } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { ACMAModel } from './cc015b.ob.acma.model';

export class OBModel extends ModelBase {

  @DnXmlElement('ACMA')
  acma: ACMAModel[];


  constructor(options: {} = {}) {
    super();

    if (options['acma']) {
      this.acma = Array<ACMAModel>();
      options['acma'].forEach(model => {
        this.acma.push(new ACMAModel(model));
      });
    }

  }
}
