import { UlkeModel } from './ulke.model';
import { isNullOrUndefined } from '@dinazor/core';
import { DnXmlElement, DnXmlIgnore, DnXmlModel } from '../../shared/utils/dn-serialize';

export class FirmaModel {

  @DnXmlIgnore()
  id: number;

  @DnXmlElement('AdiUnvani')
  adiUnvani: string;

  @DnXmlIgnore()
  vergiNo: string;

  @DnXmlElement('CadSNo')
  cadSNo: string;

  @DnXmlElement('IlIlce')
  ilIlce: string;

  @DnXmlElement('PostaKodu')
  postaKodu: string;

  @DnXmlModel('id', 'UlkeKodu')
  ulkeKod: UlkeModel;

  @DnXmlElement('Fax')
  fax: string;

  @DnXmlElement('Tel')
  tel: string;

  @DnXmlElement('Tip')
  tip: string;


  constructor(options: {} = {}) {
    this.id = options['id'];
    this.adiUnvani = options['adiUnvani'];
    this.vergiNo = options['vergiNo'];
    this.cadSNo = options['cadSNo'];
    this.ilIlce = options['ilIlce'];
    this.postaKodu = options['postaKodu'];
    this.ulkeKod = isNullOrUndefined(options['ulkeKod']) ? null : new UlkeModel(options['ulkeKod']);
    this.fax = options['fax'];
    this.tel = options['tel'];
    this.tip = options['tip'];
  }
}
