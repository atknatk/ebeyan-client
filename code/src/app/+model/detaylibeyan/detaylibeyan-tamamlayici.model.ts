import {DnXmlElement} from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanTamamlayiciModel {

  @DnXmlElement('Tamamlayici_bilgi')
  tamamlayiciBilgi: string;

  @DnXmlElement('Tamamlayici_bilgi_orani')
  tamamlayiciBilgiOrani: string;

  constructor(options: {} = {}) {
    this.tamamlayiciBilgi = options['tamamlayiciBilgi'];
    this.tamamlayiciBilgiOrani = options['tamamlayiciBilgiOrani'];
  }
}
