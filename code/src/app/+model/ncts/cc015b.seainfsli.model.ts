/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElement, DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { SEAIDSIDModel } from './cc015b.seainfsli.seaidsid.model';

export class SEAINFSLIModel {

  @DnXmlElementPascal()
  seaNumSLI2: number;

  @DnXmlElement('SEAIDSID')
  sEAIDSID: SEAIDSIDModel[];


  constructor(options: {} = {}) {
    this.seaNumSLI2 = options['seaNumSLI2'];

    if (options['sEAIDSID']) {
      this.sEAIDSID = Array<SEAIDSIDModel>();
      options['sEAIDSID'].forEach(model => {
        this.sEAIDSID.push(new SEAIDSIDModel(model));
      });
    }

  }
}
