import { DnXmlElement, DnXmlIgnore, DnXmlModel } from '../../shared/utils/dn-serialize';
import { isNullOrUndefined } from '@dinazor/core';
import { UlkeModel } from '../enum/ulke.model';

export class DetayliBeyanFirmaModel {

  @DnXmlIgnore()
  id: number;

  @DnXmlElement('Adi_unvani')
  adiUnvani: string;

  // @DnXmlElement('Kimlik_turu')
  // Kimlik_turu: string;

  // @DnXmlElement('No')
  // No: string;

  @DnXmlIgnore()
  vergiNo: string;

  @DnXmlElement('Cadde_s_no')
  cadsNo: string;

  @DnXmlElement('Il_ilce')
  ilIlce: string;

  @DnXmlElement('Posta_kodu')
  postaKodu: string;

  /*@DnXmlModel('id', 'Ulke_kodu')
  ulkeKod: UlkeModel;*/

  @DnXmlModel('id', 'Ulke_kodu')
  ulke: UlkeModel;


  @DnXmlElement('Faks')
  fax: string;

  @DnXmlElement('Telefon')
  tel: string;

  @DnXmlElement('Tip')
  tip: string;


  constructor(options: {} = {}) {
    this.id = options['id'];
    this.adiUnvani = options['adiUnvani'];
    this.vergiNo = options['vergiNo'];
    this.cadsNo = options['cadsNo'];
    this.ilIlce = options['ilIlce'];
    this.postaKodu = options['postaKodu'];
    /*this.ulkeKod = isNullOrUndefined(options['ulkeKod']) ? undefined : new UlkeModel(options['ulkeKod']);*/
    this.ulke = isNullOrUndefined(options['ulke']) ? undefined : new UlkeModel(options['ulke']);
    this.fax = options['fax'];
    this.tel = options['tel'];
    this.tip = options['tip'];
  }
}
