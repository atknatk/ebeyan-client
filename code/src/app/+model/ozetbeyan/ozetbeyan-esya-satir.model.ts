import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { DovizModel } from '../enum/doviz.model';
import { OlcuBirimModel } from '../enum/olcubirim.model';
import { isNullOrUndefined } from '@dinazor/core';
export class OzetbeyanEsyaSatirModel {

  @DnXmlElement('BmEsyaKodu')//BmEsyaKodu
  bmEsyaKodu: string;
  @DnXmlElement('BrutAgirlik')//BrutAgirlik
  brutAgirlik: number;
  @DnXmlElement('EsyaKodu')//EsyaKodu
  gtipNo: string;
  @DnXmlElement('EsyaninTanimi')//EsyaninTanimi
  esyaTanim: string;
  @DnXmlElement('KalemFiyati')//KalemFiyati
  kalemFiyat: number;
  @DnXmlModel('id', 'KalemFiyatiDoviz') //KalemFiyatiDoviz
  kalemFiyatDoviz: DovizModel;
  @DnXmlElement('KalemSiraNo')//KalemSiraNo
  kalemSiraNo: number;
  @DnXmlElement('NetAgirlik')//NetAgirlik
  netAgirlik: number;
  @DnXmlModel('id', 'OlcuBirimi') //OlcuBirimi
  olcuBirim: OlcuBirimModel;


  constructor(options: {}
                = {}) {
    this.bmEsyaKodu = options['bmEsyaKodu'];
    this.brutAgirlik = options['brutAgirlik'];
    this.gtipNo = options['gtipNo'];
    this.esyaTanim = options['esyaTanim'];
    this.kalemFiyat = options['kalemFiyat'];
    this.kalemFiyatDoviz = isNullOrUndefined(options['kalemFiyatDoviz']) ? undefined : new DovizModel(options['kalemFiyatDoviz']);
    this.kalemSiraNo = options['kalemSiraNo'];
    this.netAgirlik = options['netAgirlik'];
    this.olcuBirim =isNullOrUndefined(options['olcuBirim']) ? undefined : new OlcuBirimModel(options['olcuBirim']);
  }
}
