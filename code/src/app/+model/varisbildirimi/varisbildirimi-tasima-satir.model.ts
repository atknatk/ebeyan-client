import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { KapKodModel } from '../enum/kapkod.model';
import { KonteynerTipModel } from '../enum/konteynertip.model';
import { OlcuBirimModel } from '../enum/olcubirim.model';
import { EsyaSatirModel } from '../esya-satir.model';
import { isNullOrUndefined } from '@dinazor/core';

export class VarisbildirimiTasimaSatirModel {

  @DnXmlElement('BrutAgirlik')// BrutAgirlik
  brutAgirlik: number;

  @DnXmlElement('KapAdedi')// KapAdedi
  kapAdet: number;

  @DnXmlModel('code', 'KapCinsi') // KapCinsi
  kapKod: KapKodModel;

  @DnXmlModel('code', 'KonteynerTipi')// KontynerTipi
  konteynerTip: KonteynerTipModel;

  @DnXmlElement('MarkaNo')// MarkaNo
  markaNo: string;

  @DnXmlElement('MuhurNumarasi')// MuhurNumarasi
  muhurNo: string;

  @DnXmlElement('NetAgirlik')// NetAgirlik
  netAgirlik: number;

  @DnXmlModel('code', 'OlcuBirimi')// OlcuBirimi
  olcuBirim: OlcuBirimModel;

  @DnXmlElement('SatirNo')// SatirNo
  satirNo: number;


  constructor(options: {}
                = {}) {

    this.brutAgirlik = options['brutAgirlik'];
    this.kapAdet = options['kapAdet'];
    this.kapKod = isNullOrUndefined(options['kapKod']) ? undefined : new KapKodModel(options['kapKod']);
    this.konteynerTip = isNullOrUndefined(options['konteynerTip']) ? undefined : new KonteynerTipModel(options['konteynerTip']);
    this.markaNo = options['markaNo'];
    this.muhurNo = options['muhurNo'];
    this.netAgirlik = options['netAgirlik'];
    this.olcuBirim = isNullOrUndefined(options['olcuBirim']) ? undefined : new OlcuBirimModel(options['olcuBirim']);
    this.satirNo = options['satirNo'];
  }
}
