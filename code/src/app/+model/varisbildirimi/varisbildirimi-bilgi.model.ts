import { VarisbildirimiTasitinUgradigiUlke } from './varisbildirimi-tasitin-ugradigi-ulke';
import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { FirmaModel } from '../enum/firma.model';
import { LimanKodModel } from '../enum/limankod.model';
import { UlkeModel } from '../enum/ulke.model';
import { VarisbildirimiTasimaSenetModel } from './varisbildirimi-tasimasenet.model';
import { isNullOrUndefined } from '@dinazor/core';
import { BeyanTuruModel } from '../enum/beyanturu.model';
import { TasimaSekliModel } from '../enum/tasimasekli.model';
import { GumrukIdaresiModel } from '../enum/gumrukidaresi.model';

export class VarisbildirimiBilgiModel {

  @DnXmlElement('RefNo')
  refNo: string;
  @DnXmlModel('code', 'BeyanTuru')
  beyanTuru: BeyanTuruModel;
  @DnXmlElement('Rejim')
  rejim: string;
  @DnXmlModel('code', 'TasimaSekli')
  tasimaSekli: TasimaSekliModel;
  @DnXmlModel('code', 'GumrukIdaresi')
  gumrukIdaresi: GumrukIdaresiModel;
  @DnXmlElement('EkBelgeSayisi')
  ekBelgeSayisi: number;
  @DnXmlElement('KullaniciKodu')
  kullaniciKodu: string;
  @DnXmlModel('vergiNo', 'BeyanSahibiVergiNo')
  beyanSahibi: FirmaModel;
  @DnXmlElement('TasiyiciVergiNo')
  tasiyiciFirmaVergiNo: string;
  @DnXmlElement('TasitinAdi')
  tasitAdi: string;
  @DnXmlElement('PlakaSeferNo')
  tasitNumarasi: string;
  @DnXmlElement('ReferansNumarasi')
  tasitReferansNumarasi: string;
  @DnXmlModel('code', 'UlkeKodu')
  tasitUlkesi: UlkeModel;
  @DnXmlElement('VarisTarihSaati')
  tasitVarisTarihTescil: string;
  @DnXmlElement('OncekiBeyanNo')
  oncekiBeyanNo: string;
  @DnXmlElement('GrupTasimaSenediNo')
  grupTasimaSenediNo: string;
  @DnXmlModel('code', 'VarisCikisGumrukIdaresi')
  ilkVarisYeri: GumrukIdaresiModel;
  @DnXmlElement('TirAtaKarneNo')
  tirKarneNo: string;
  @DnXmlElement('Kurye')
  isKurye: boolean;
  @DnXmlElement('DorseNo1')
  tasitDorseNo1: string;
  @DnXmlModel('code', 'DorseNo1Uyrugu')
  tasitDorse1Uyruk: UlkeModel;
  @DnXmlElement('DorseNo2')
  tasitDorseNo2: string;
  @DnXmlModel('code', 'DorseNo2Uyrugu')
  tasitDorse2Uyruk: UlkeModel;
  @DnXmlElement('Diger')
  diger: string;
  @DnXmlElement('XmlRefId')
  xmlRefId: string;
  @DnXmlModel('code', 'UlkeKoduYuk')
  yuklemeUlkesi: UlkeModel;
  @DnXmlModel('code', 'LimanYerAdiYuk')
  yuklemeLimani: LimanKodModel;
  @DnXmlModel('code', 'UlkeKoduBos')
  bosaltmaUlkesi: UlkeModel;
  @DnXmlModel('code', 'LimanYerAdiBos')
  bosaltmaLimani: LimanKodModel;
  @DnXmlElement('YuklemeBosaltmaYeri')
  yuklemeBosaltmaYeri: string;
  @DnXmlElement('TasiyiciFirma')
  tasiyiciFirma: FirmaModel;
  @DnXmlElement('EmniyetGuvenlik')
  isEmniyetGuvenlik: boolean;

  @DnXmlElement('TasitinUgradigiUlkeler')
  @DnXmlRoot('TasitinUgradigiUlkeBilgisi')
  varisBildirimiTasitinUgradigiUlkelerList: VarisbildirimiTasitinUgradigiUlke[];

  @DnXmlElement('TasimaSenetleri')
  @DnXmlRoot('TasimaSenediBilgisi')
  varisBildirimiTasimaSenetList: VarisbildirimiTasimaSenetModel[];


  constructor(options: {} = {}) {
    this.refNo = options['refNo'];
    this.rejim = options['rejim'];
    this.beyanTuru = isNullOrUndefined(options['beyanTuru']) ? undefined : new BeyanTuruModel(options['beyanTuru']);
    this.tasimaSekli = isNullOrUndefined(options['tasimaSekli']) ? undefined : new TasimaSekliModel(options['tasimaSekli']);
    this.gumrukIdaresi = isNullOrUndefined(options['gumrukIdaresi']) ? undefined : new GumrukIdaresiModel(options['gumrukIdaresi']);
    this.ekBelgeSayisi = options['ekBelgeSayisi'];
    this.kullaniciKodu = options['kullaniciKodu'];
    this.beyanSahibi = isNullOrUndefined(options['beyanSahibi']) ? undefined : new FirmaModel(options['beyanSahibi']);
    this.tasitAdi = options['tasitAdi'];
    this.tasitNumarasi = options['tasitNumarasi']; // ????
    this.tasitReferansNumarasi = options['tasitReferansNumarasi'];
    this.tasitUlkesi = isNullOrUndefined(options['tasitUlkesi']) ? undefined : new UlkeModel(options['tasitUlkesi']);
    this.tasitVarisTarihTescil = options['tasitVarisTarihTescil'];
    this.oncekiBeyanNo = options['oncekiBeyanNo'];
    this.grupTasimaSenediNo = options['grupTasimaSenediNo'];
    this.ilkVarisYeri = isNullOrUndefined(options['ilkVarisYeri']) ? undefined : new GumrukIdaresiModel(options['ilkVarisYeri']);
    this.tirKarneNo = options['tirKarneNo'];
    this.isKurye = options['isKurye'];
    this.tasitDorseNo1 = options['tasitDorseNo1'];
    this.tasitDorse1Uyruk = isNullOrUndefined(options['tasitDorse1Uyruk']) ? undefined : new UlkeModel(options['tasitDorse1Uyruk']);
    this.tasitDorseNo2 = options['tasitDorseNo2'];
    this.tasitDorse2Uyruk = isNullOrUndefined(options['tasitDorse2Uyruk']) ? undefined : new UlkeModel(options['tasitDorse2Uyruk']);
    this.diger = options['diger'];
    this.xmlRefId = options['xmlRefId'];
    this.yuklemeUlkesi = isNullOrUndefined(options['yuklemeUlkesi']) ? undefined : new UlkeModel(options['yuklemeUlkesi']);
    this.yuklemeLimani = isNullOrUndefined(options['yuklemeLimani']) ? undefined : new LimanKodModel(options['yuklemeLimani']);
    this.bosaltmaUlkesi = isNullOrUndefined(options['bosaltmaUlkesi']) ? undefined : new UlkeModel(options['bosaltmaUlkesi']);
    this.bosaltmaLimani = isNullOrUndefined(options['bosaltmaLimani']) ? undefined : new LimanKodModel(options['bosaltmaLimani']);
    this.yuklemeBosaltmaYeri = options['yuklemeBosaltmaYeri'];
    this.isEmniyetGuvenlik = options['isEmniyetGuvenlik'];

    if (isNullOrUndefined(options['tasitVarisTarihTescil'])) {
      this.tasitVarisTarihTescil = '0001-01-01T00:00:00';
    }

    if (!isNullOrUndefined(options['tasiyiciFirma'])) {
      if (isNullOrUndefined(options['tasiyiciFirma']['vergiNo'])) {
        this.tasiyiciFirma = isNullOrUndefined(options['tasiyiciFirma']) ? undefined : new FirmaModel(options['tasiyiciFirma']);
      } else {
        this.tasiyiciFirmaVergiNo = options['tasiyiciFirma']['vergiNo'];
      }
    }

    if (options['varisBildirimiTasimaSenetList']) {
      this.varisBildirimiTasimaSenetList = Array<VarisbildirimiTasimaSenetModel>();
      options['varisBildirimiTasimaSenetList'].forEach(senet => {
        this.varisBildirimiTasimaSenetList.push(new VarisbildirimiTasimaSenetModel(senet));
      });
    }
    if (options['varisBildirimiTasitinUgradigiUlkelerList']) {
      this.varisBildirimiTasitinUgradigiUlkelerList = Array<VarisbildirimiTasitinUgradigiUlke>();
      options['varisBildirimiTasitinUgradigiUlkelerList'].forEach(senet => {
        this.varisBildirimiTasitinUgradigiUlkelerList.push(new VarisbildirimiTasitinUgradigiUlke(senet));
      });
    }
  }


}
