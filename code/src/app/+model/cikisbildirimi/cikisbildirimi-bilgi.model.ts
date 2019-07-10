import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { BeyanTuruModel } from '../enum/beyanturu.model';
import { TasimaSekliModel } from '../enum/tasimasekli.model';
import { GumrukIdaresiModel } from '../enum/gumrukidaresi.model';
import { FirmaModel } from '../enum/firma.model';
import { UlkeModel } from '../enum/ulke.model';
import { LimanKodModel } from '../enum/limankod.model';
import { isNullOrUndefined } from 'util';
import { CikisbildirimiTasimaSenetModel } from './cikisbildirimi-tasimasenet.model';
import { CikisbildirimiTasitinUgradigiUlke } from './cikisbildirimi-tasitin-ugradigi-ulke';

export class CikisbildirimiBilgiModel {


  @DnXmlElement('RefNo')
  refNo: string;

  @DnXmlModel('id', 'BeyanTuru')
  beyanTuru: BeyanTuruModel;

  @DnXmlElement('Rejim')
  rejim: string;

  @DnXmlModel('id', 'TasimaSekli')
  tasimaSekli: TasimaSekliModel;

  @DnXmlModel('id', 'GumrukIdaresi')
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

  @DnXmlModel('id', 'UlkeKodu')
  tasitUlkesi: UlkeModel;

  @DnXmlElement('VarisTarihSaati')
  tasitVarisTarihTescil: Date;

  @DnXmlElement('OncekiBeyanNo')
  oncekiBeyanNo: string;

  @DnXmlElement('GrupTasimaSenediNo')
  grupTasimaSenediNo: string;

  @DnXmlModel('id', 'VarisCikisGumrukIdaresi')
  ilkVarisYeri: GumrukIdaresiModel;

  @DnXmlElement('TirAtaKarneNo')
  tirKarneNo: string;

  @DnXmlElement('Kurye')
  isKurye: boolean;

  @DnXmlElement('DorseNo1')
  tasitDorseNo1: string;

  @DnXmlModel('id', 'DorseNo1Uyrugu')
  tasitDorse1Uyruk: UlkeModel;

  @DnXmlElement('DorseNo2')
  tasitDorseNo2: string;

  @DnXmlModel('id', 'DorseNo2Uyrugu')
  tasitDorse2Uyruk: UlkeModel;

  @DnXmlElement('Diger')
  diger: string;

  @DnXmlElement('XmlRefId')
  xmlRefId: string;

  @DnXmlModel('id', 'UlkeKoduYuk')
  yuklemeUlkesi: UlkeModel;

  @DnXmlModel('id', 'LimanYerAdiYuk')
  yuklemeLimani: LimanKodModel;

  @DnXmlModel('id', 'UlkeKoduBos')
  bosaltmaUlkesi: UlkeModel;

  @DnXmlModel('id', 'LimanYerAdiBos')
  bosaltmaLimani: LimanKodModel;

  @DnXmlElement('YuklemeBosaltmaYeri')
  yuklemeBosaltmaYeri: string;

  @DnXmlElement('TasiyiciFirma')
  tasiyiciFirma: FirmaModel;

  @DnXmlElement('EmniyetGuvenlik')
  isEmniyetGuvenlik: boolean;

  @DnXmlElement('TasitinUgradigiUlkeler')
  @DnXmlRoot('TasitinUgradigiUlkeBilgisi')
  cikisBildirimiTasitinUgradigiUlkelerList: CikisbildirimiTasitinUgradigiUlke[];

  @DnXmlElement('TasimaSenetleri')
  @DnXmlRoot('TasimaSenediBilgisi')
  cikisBildirimiTasimaSenetList: CikisbildirimiTasimaSenetModel[];


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

    if (!isNullOrUndefined(options['tasiyiciFirma'])) {
      if (isNullOrUndefined(options['tasiyiciFirma']['vergiNo'])) {
        this.tasiyiciFirma = isNullOrUndefined(options['tasiyiciFirma']) ? undefined : new FirmaModel(options['tasiyiciFirma']);
      } else {
        this.tasiyiciFirmaVergiNo = options['tasiyiciFirma']['vergiNo'];
      }
    }


    if (options['cikisBildirimiTasimaSenetList']) {
      this.cikisBildirimiTasimaSenetList = Array<CikisbildirimiTasimaSenetModel>();
      options['cikisBildirimiTasimaSenetList'].forEach(senet => {
        this.cikisBildirimiTasimaSenetList.push(new CikisbildirimiTasimaSenetModel(senet));
      });
    }
    if (options['cikisBildirimiTasitinUgradigiUlkelerList']) {
      this.cikisBildirimiTasitinUgradigiUlkelerList = Array<CikisbildirimiTasitinUgradigiUlke>();
      options['cikisBildirimiTasitinUgradigiUlkelerList'].forEach(senet => {
        this.cikisBildirimiTasitinUgradigiUlkelerList.push(new CikisbildirimiTasitinUgradigiUlke(senet));
      });
    }
  }


}
