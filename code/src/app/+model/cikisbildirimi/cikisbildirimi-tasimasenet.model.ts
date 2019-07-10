import { isNullOrUndefined } from '@dinazor/core';
import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { DovizModel } from '../enum/doviz.model';
import { FirmaModel } from '../enum/firma.model';
import { OdemeSekliModel } from '../enum/odemesekli.model';
import { UlkeModel } from '../enum/ulke.model';
import { CikisbildirimiIhracatModel } from './cikisbildirimi-ihracat.model';
import { CikisbildirimiTasimaSatirModel } from './cikisbildirimi-tasima-satir.model';

export class CikisbildirimiTasimaSenetModel {

  @DnXmlElement('TasimaSenediNo')//  TasimaSenediNo
  tasimaSenetNo: string;

  @DnXmlModel('id', 'DuzenlendigiUlke')
  düzenlendigiUlke: UlkeModel;

  @DnXmlElement('FaturaToplami')//  FaturaToplami
  faturaToplam: number;

  @DnXmlModel('id', 'FaturaDoviz') //  FaturaDoviz
  faturaToplamDoviz: DovizModel;

  @DnXmlElement('NavlunTutari')//  NavlunTutari
  navlunTutar: number;

  @DnXmlModel('id', 'NavlunDoviz') //  NavlunDoviz
  navlunTutarDoviz: DovizModel;

  @DnXmlModel('adiUnvani', 'GondericiAdi')
  @DnXmlModel('vergiNo', 'GondericiVergiNo') //  GondericiAdi , GondericiVergiNo
  gonderici: FirmaModel;

  @DnXmlModel('adiUnvani', 'AliciAdi')
  @DnXmlModel('vergiNo', 'AliciVergiNo') // GondericiAdi , GondericiVergiNo
  alici: FirmaModel;

  @DnXmlModel('adiUnvani', 'BildirimTarafiAdi')
  @DnXmlModel('vergiNo', 'BildirimTarafiVergiNo') // GondericiAdi , GondericiVergiNo
  bildirimTarafi: FirmaModel;

  // @DnXmlModel('adiUnvani', 'GondericiAdi')
  @DnXmlModel('vergiNo', 'AcentaVergiNo') // GondericiAdi , GondericiVergiNo
  acenta: FirmaModel;

  @DnXmlModel('id', 'OdemeSekli') // OdemeSekli
  odemeSekil: OdemeSekliModel;

  @DnXmlElement('EsyaninBulunduguYer')// EsyaninBulunduguYer
  esyaninBulunduguYer: string;

  @DnXmlElement('GrupMu')// GrupMu
  isGrup: boolean;

  @DnXmlElement('AmbarHariciMi')
  isAmbarHarici: boolean;

  @DnXmlElement('KonteynerMi')// KonteynerMi
  isKonteyner: boolean;

  @DnXmlElement('OncekiSeferNumarasi')// OncekiSeferNumarasi
  oncekiSeferinNumarasi: string;

  @DnXmlElement('OncekiSeferTarihi')// OncekiSeferTarihi
  oncekiSeferinTarihi: Date;

  @DnXmlElement('OzetBeyanNo')
  ozetBeyanNo: any; //  TODO bu ne olacak

  @DnXmlElement('RoroMu')
  isRoro: boolean;

  @DnXmlElement('SenetSiraNo')// SenetSiraNo
  senetSiraNo: string;

  @DnXmlElement('EmniyetGuvenlikT')
  isEmniyetGuvenlik: boolean;

  @DnXmlElement('AktarmaYapilacakMi')// AktarmaYapilacakMi
  isAktarma: boolean;

  @DnXmlElement('TasimaSatirlari')
  @DnXmlRoot('TasimaSatiriBilgisi')
  cikisBildirimiTasimaSatirList: CikisbildirimiTasimaSatirModel[];

  @DnXmlElement('Ihracatlar')
  @DnXmlRoot('IhracatBilgisi')
  ihracatIlgiliBeyanList: CikisbildirimiIhracatModel[];


  constructor(options: {}
                = {}) {
    this.acenta = isNullOrUndefined(options['acenta']) ? undefined : new FirmaModel(options['acenta']);
    this.alici = isNullOrUndefined(options['alici']) ? undefined : new FirmaModel(options['alici']);
    this.isAmbarHarici = options['isAmbarHarici'];
    this.bildirimTarafi = isNullOrUndefined(options['bildirimTarafi']) ? undefined : new FirmaModel(options['bildirimTarafi']);
    this.düzenlendigiUlke = isNullOrUndefined(options['düzenlendigiUlke']) ? undefined : new UlkeModel(options['düzenlendigiUlke']);
    this.isEmniyetGuvenlik = options['isEmniyetGuvenlik'];
    this.esyaninBulunduguYer = options['esyaninBulunduguYer'];
    this.faturaToplamDoviz = isNullOrUndefined(options['faturaToplamDoviz']) ? undefined : new DovizModel(options['faturaToplamDoviz']);
    this.faturaToplam = options['faturaToplam'];
    this.gonderici = isNullOrUndefined(options['gonderici']) ? undefined : new FirmaModel(options['gonderici']);
    this.isGrup = options['isGrup'];
    this.isKonteyner = options['isKonteyner'];
    this.navlunTutarDoviz = isNullOrUndefined(options['navlunTutarDoviz']) ? undefined : new DovizModel(options['navlunTutarDoviz']);
    this.navlunTutar = options['navlunTutar'];
    this.odemeSekil = isNullOrUndefined(options['odemeSekil']) ? undefined : new OdemeSekliModel(options['odemeSekil']);
    this.oncekiSeferinNumarasi = options['oncekiSeferinNumarasi'];
    this.oncekiSeferinTarihi = isNullOrUndefined(options['oncekiSeferinTarihi']) ? new Date() : options['oncekiSeferinTarihi'];
    this.senetSiraNo = options['senetSiraNo'];
    this.isAktarma = options['isAktarma'];
    this.isRoro = options['isRoro'];
    this.tasimaSenetNo = options['tasimaSenetNo'];

    if (options['cikisBildirimiTasimaSatirList']) {
      this.cikisBildirimiTasimaSatirList = Array<CikisbildirimiTasimaSatirModel>();
      options['cikisBildirimiTasimaSatirList'].forEach(satir => {
        this.cikisBildirimiTasimaSatirList.push(new CikisbildirimiTasimaSatirModel(satir));
      });
    }

    if (options['ihracatIlgiliBeyanList']) {
      this.ihracatIlgiliBeyanList = Array<CikisbildirimiIhracatModel>();
      options['ihracatIlgiliBeyanList'].forEach(ulke => {
        this.ihracatIlgiliBeyanList.push(new CikisbildirimiIhracatModel(ulke));
      });
    }

  }
}
