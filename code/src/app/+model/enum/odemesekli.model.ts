/**
 * Created by cabbar on 08.05.2017.
 */
import { DnXmlElement, DnXmlIgnore } from '../../shared/utils/dn-serialize';

export class OdemeSekliModel {

  @DnXmlElement('OdemeSekliKodu')
  id: string;
  @DnXmlElement('OdemeTutari')
  value: number;

  constructor(options: {} = {}) {
    this.id = options['id'];
    this.value = options['value'];
  }
}
