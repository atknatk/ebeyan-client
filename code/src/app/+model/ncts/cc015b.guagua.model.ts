/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElement, DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { GUAREFREFModel } from './cc015b.guagua.guarefref.model';

export class GUAGUAModel {

  @DnXmlElementPascal()
  guaTypGUA1: string;

  @DnXmlElement('GUAREFREF')
  guarefref: GUAREFREFModel[];


  constructor(options: {} = {}) {
    this.guaTypGUA1 = options['guaTypGUA1'];

    if (options['guarefref']) {
      this.guarefref = Array<GUAREFREFModel>();
      options['guarefref'].forEach(model => {
        this.guarefref.push(new GUAREFREFModel(model));
      });
    }

  }
}
