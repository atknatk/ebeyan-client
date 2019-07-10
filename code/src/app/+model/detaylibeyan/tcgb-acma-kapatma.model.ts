import {DnXmlElement} from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */

export class TcgbAcmaKapatmaModel {

  @DnXmlElement('Kapatilan_beyanname_no')
  kapatilanBeyannameNo: string;

  @DnXmlElement('Kapatilan_kalem_no')
  kapatilanKalemNo: string;

  @DnXmlElement('Kapatilan_miktar')
  kapatilanMiktar: number;

  @DnXmlElement('Aciklama')
  aciklama: string;


  constructor(options: {} = {}) {

    this.kapatilanBeyannameNo = options['kapatilanBeyannameNo'];
    this.kapatilanKalemNo = options['kapatilanKalemNo'];
    this.kapatilanMiktar = options['kapatilanMiktar'];
    this.aciklama = options['aciklama'];
  }

}
