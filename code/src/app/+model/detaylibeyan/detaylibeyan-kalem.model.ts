import { isNullOrUndefined } from '@dinazor/core';
import { HavacilikYakitTuruModel } from 'app/+model/detaylibeyan/havacilik-yakit-turu.model';
import { isArray } from 'util';
import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { DetayliBeyanFirmaModel } from './detaylibeyan-firma.model';
import { DetayliBeyanKonteynerModel } from './detaylibeyan-konteyner.model';
import { DetayliBeyanMarkaModel } from './detaylibeyan-marka.model';
import { DetayliBeyanTamamlayiciModel } from './detaylibeyan-tamamlayici.model';
import { TcgbAcmaKapatmaModel } from './tcgb-acma-kapatma.model';
import { OdemeSekliModel } from '../enum/odemesekli.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanKalemModel extends ModelBase {

  // region Properties

  // @DnXmlElement('Gtip')
  @DnXmlElement('Gtip')
  gtip: string;

  @DnXmlElement('Imalatci_firma_bilgisi')
  isImalatciFirma: string;

  @DnXmlModel('vergiNo', 'Imalatci_Vergino')
  imalatciFirma: DetayliBeyanFirmaModel;

  @DnXmlElement('Kalem_sira_no')
  kalemNo: number;

  @DnXmlElement('Mensei_ulke')
  menseUlke: string;

  @DnXmlElement('Brut_agirlik')
  brutAgirlik: number;

  @DnXmlElement('Net_agirlik')
  netAgirlik: number;

  @DnXmlElement('Tamamlayici_olcu_birimi')
  tamamlayiciOlcuBirim: string;

  @DnXmlElement('Istatistiki_miktar')
  istatistikiMiktar: number;

  @DnXmlElement('Miktar_birimi')
  miktarBirim: string;

  @DnXmlElement('Uluslararasi_anlasma')
  uluslararasiAnlasmalar: string;

  @DnXmlElement('Algilama_birimi_1')
  algilamaBirimi1: string;

  @DnXmlElement('Algilama_miktari_1')
  algilamaMiktari1: number;

  @DnXmlElement('Algilama_birimi_2')
  algilamaBirimi2: string;

  @DnXmlElement('Algilama_miktari_2')
  algilamaMiktari2: number;

  @DnXmlElement('Algilama_birimi_3')
  algilamaBirimi3: string;

  @DnXmlElement('Algilama_miktari_3')
  algilamaMiktari3: number;

  @DnXmlElement('Muafiyetler_1')
  muafiyetKod1: string;

  @DnXmlElement('Muafiyetler_2')
  muafiyetKod2: string;

  @DnXmlElement('Muafiyetler_3')
  muafiyetKod3: string;

  @DnXmlElement('Muafiyetler_4')
  muafiyetKod4: string;

  @DnXmlElement('Muafiyetler_5')
  muafiyetKod5: string;

  @DnXmlElement('Teslim_sekli')
  teslimSekli: string;

  @DnXmlElement('Ek_kod')
  ekKod: string;

  @DnXmlElement('Ozellik')
  ozellik: string;

  @DnXmlElement('Fatura_miktari')
  fatura: number;

  @DnXmlElement('Fatura_miktarinin_dovizi')
  faturaDoviz: string;

  @DnXmlElement('Sinir_gecis_ucreti')
  sinirGecisUcreti: number;

  @DnXmlElement('Navlun_miktari')
  navlunBedeli: number;

  @DnXmlElement('Navlun_miktarinin_dovizi')
  navlunBedeliDoviz: string;

  @DnXmlElement('Istatistiki_kiymet')
  istatiskiKiymet: string;

  @DnXmlElement('Sigorta_miktari')
  sigortaBedeli: number;

  @DnXmlElement('Sigorta_miktarinin_dovizi')
  sigortaBedeliDoviz: string;

  @DnXmlElement('Tarifedeki_tanimi')
  tarifedekiTanimi: string;

  @DnXmlElement('Ticari_tanimi')
  ticariTanimi: string;

  @DnXmlElement('Marka')
  esyaMarka: string;

  @DnXmlElement('Numara')
  esyaNumara: number;

  @DnXmlElement('Adedi')
  esyaAdet: number;

  @DnXmlElement('Cinsi')
  esyaCinsi: string;

  @DnXmlElement('Mahrece_iade')
  mahreceIade: string;

  @DnXmlElement('Ikincil_islem')
  isIkincilIslem: string;

  @DnXmlElement('Satir_no')
  satirNo: string;

  @DnXmlElement('Miktar')
  miktar: number;

  @DnXmlElement('Kdv_orani')
  kdv: string;

  @DnXmlElement('Kullanilmis_esya')
  kullanilmisEsya: string;

  @DnXmlElement('Aciklama_44')
  aciklamalar: string;

  @DnXmlElement('Yurtici_Diger')
  yurticiDiger: number;

  @DnXmlElement('Yurtici_Banka')
  yurticiBankaMasraflari: number;

  @DnXmlElement('Yurtici_Depolama')
  yurticiDepolamaGiderleri: number;

  @DnXmlElement('Yurtici_Tahliye')
  yurticiTahmilTahliyeGider: number;

  @DnXmlElement('Yurtici_Liman')
  yurticiLimanGiderleri: number;

  @DnXmlElement('Yurtici_Kultur')
  yurticiKulturBakanligiKesinti: number;

  @DnXmlElement('Yurtici_Kkdf')
  yurticiKkdf: number;

  @DnXmlElement('Yurtici_Cevre')
  yurticiCevreKatkiPayi: number;

  @DnXmlElement('Yurtici_Diger_Aciklama')
  yurticiDigerAciklama: string;

  @DnXmlElement('Muafiyet_Aciklamasi')
  muafiyetAciklama: string;

  @DnXmlElement('Referans_Tarihi')
  referansTarihi: string;

  @DnXmlElement('YurtDisi_Komisyon')
  yurtdisiKomisyon: number;

  @DnXmlElement('YurtDisi_Demuraj')
  yurtdisiDemuraj: number;

  @DnXmlElement('YurtDisi_Royalti')
  yurtdisiRoyalti: number;

  @DnXmlElement('YurtDisi_Faiz')
  yurtdisiFaiz: number;

  @DnXmlElement('YurtDisi_Diger')
  yurtdisiDiger: number;

  @DnXmlElement('YurtDisi_Komisyon_Dovizi')
  yurtdisiKomisyonDoviz: string;

  @DnXmlElement('YurtDisi_Demuraj_Dovizi')
  yurtdisiDemurajDoviz: string;

  @DnXmlElement('YurtDisi_Royalti_Dovizi')
  yurtdisiRoyaltiDoviz: string;

  @DnXmlElement('YurtDisi_Faiz_Dovizi')
  yurtdisiFaizDoviz: string;

  @DnXmlElement('YurtDisi_Diger_Dovizi')
  yurtdisiDigerDoviz: string;

  @DnXmlElement('YurtDisi_Diger_Aciklama')
  digerAciklama: string;

  @DnXmlElement('Kalem_Islem_Niteligi')
  isleminNiteligi: string;

  @DnXmlElement('Giris_Cikis_Amaci')
  esyaninGirisCikisAmaci: string;

  @DnXmlElement('Giris_Cikis_Amaci_Aciklama')
  esyaninGirisCikisAmaciAciklama: string;

  @DnXmlElement('STM_IlKodu')
  stmBagliIl: string;

  @DnXmlElement('OdemeSekli')
  odemeSekil: string;
  // endregion


  @DnXmlElement('tamamlayici_bilgi')
  @DnXmlRoot('tamamlayici')
  detayliBeyanTamamlayiciList: DetayliBeyanTamamlayiciModel[];

  @DnXmlElement('tcgbacmakapatma_bilgi')
  @DnXmlRoot('tcgbacmakapatma')
  tcgbAcmaKapatmaList: TcgbAcmaKapatmaModel[];

  @DnXmlElement('marka_model_bilgi')
  @DnXmlRoot('Marka')
  detayliBeyanMarkaList: DetayliBeyanMarkaModel[];

  @DnXmlElement('konteyner_Bilgi')
  @DnXmlRoot('Konteyner')
  detayliBeyanKonteynerList: DetayliBeyanKonteynerModel[];

  // VergiMuafiyetleri

  @DnXmlElement('HavacilikYakitTurleri')
  @DnXmlRoot('HavacilikYakitTuru')
  havacilikYakitTuruList: HavacilikYakitTuruModel[];


  @DnXmlElement('OdemeSekilleri')
  @DnXmlRoot('OdemeSekli')
  detayliBeyanKalemOdemeSekil: OdemeSekliModel[];

  constructor(options: {} = {}) {
    super();

    // region Properties
    this.gtip = options['gtip'];
    if (options['isImalatciFirma'] == 1) {
      this.isImalatciFirma = 'EVET';
    } else if (options['isImalatciFirma'] == 2) {
      this.isImalatciFirma = 'HAYIR';
    }
    this.imalatciFirma = isNullOrUndefined(options['imalatciFirma']) ? undefined : new DetayliBeyanFirmaModel(options['imalatciFirma']);
    this.kalemNo = options['kalemNo'];


    this.tamamlayiciOlcuBirim = options['tamamlayiciOlcuBirim'];
    this.istatistikiMiktar = options['istatistikiMiktar'];
    this.miktar = options['miktar'];
    this.miktarBirim = options['miktarBirim'];
    // this.tamamlayiciOlcu = options['tamamlayiciOlcu'];


    this.menseUlke = options['menseUlke'];
    this.brutAgirlik = options['brutAgirlik'];
    this.netAgirlik = options['netAgirlik'];
    this.uluslararasiAnlasmalar = options['uluslararasiAnlasmalar'];
    this.algilamaBirimi1 = options['algilamaBirimi1'];
    this.algilamaMiktari1 = options['algilamaMiktari1'];
    this.algilamaBirimi2 = options['algilamaBirimi2'];
    this.algilamaMiktari2 = options['algilamaMiktari2'];
    this.algilamaBirimi3 = options['algilamaBirimi3'];
    this.algilamaMiktari3 = options['algilamaMiktari3'];
    this.muafiyetKod1 = options['muafiyetKod1'];
    this.muafiyetKod2 = options['muafiyetKod2'];
    this.muafiyetKod3 = options['muafiyetKod3'];
    this.muafiyetKod4 = options['muafiyetKod4'];
    this.muafiyetKod5 = options['muafiyetKod5'];
    this.ekKod = options['ekKod'];
    this.ozellik = options['ozellik'];
    this.fatura = options['fatura'];
    this.faturaDoviz = options['faturaDoviz'];
    this.sinirGecisUcreti = options['sinirGecisUcreti'];
    this.navlunBedeli = options['navlunBedeli'];
    this.navlunBedeliDoviz = options['navlunBedeliDoviz'];
    this.istatiskiKiymet = options['istatiskiKiymet'];
    this.teslimSekli = options['teslimSekli'];
    this.sigortaBedeli = options['sigortaBedeli'];
    this.sigortaBedeliDoviz = options['sigortaBedeliDoviz'];
    this.tarifedekiTanimi = options['tarifedekiTanimi'];
    this.ticariTanimi = options['ticariTanimi'];
    this.esyaNumara = options['esyaNumara'];
    this.esyaAdet = options['esyaAdet'];
    this.esyaMarka = options['esyaMarka'];
    this.esyaCinsi = options['esyaCinsi'];
    if (options['mahreceIade'] == 1) {
      this.mahreceIade = 'EVET';
    } else if (options['mahreceIade'] == 2) {
      this.mahreceIade = 'HAYIR';
    } else {
      this.mahreceIade = null;
    }

    if (options['isIkincilIslem'] == 1) {
      this.isIkincilIslem = 'EVET';
    } else if (options['isIkincilIslem'] == 2) {
      this.isIkincilIslem = 'HAYIR';
    } else {
      this.isIkincilIslem = null;
    }
    this.satirNo = options['satirNo'];
    this.kdv = options['kdv'];
    this.kullanilmisEsya = options['kullanilmisEsya'];
    this.aciklamalar = options['aciklamalar'];
    this.yurticiDiger = options['yurticiDiger'];
    this.yurticiBankaMasraflari = options['yurticiBankaMasraflari'];
    this.yurticiDepolamaGiderleri = options['yurticiDepolamaGiderleri'];
    this.yurticiTahmilTahliyeGider = options['yurticiTahmilTahliyeGider'];
    this.yurticiLimanGiderleri = options['yurticiLimanGiderleri'];
    this.yurticiKulturBakanligiKesinti = options['yurticiKulturBakanligiKesinti'];
    this.yurticiKkdf = options['yurticiKkdf'];
    this.yurticiCevreKatkiPayi = options['yurticiCevreKatkiPayi'];
    this.yurticiDigerAciklama = options['yurticiDigerAciklama'];
    this.muafiyetAciklama = options['muafiyetAciklama'];
    this.referansTarihi = options['referansTarihi'];
    this.yurtdisiKomisyon = options['yurtdisiKomisyon'];
    this.yurtdisiDemuraj = options['yurtdisiDemuraj'];
    this.yurtdisiRoyalti = options['yurtdisiRoyalti'];
    this.yurtdisiFaiz = options['yurtdisiFaiz'];
    this.yurtdisiDiger = options['yurtdisiDiger'];
    this.yurtdisiKomisyonDoviz = options['yurtdisiKomisyonDoviz'];
    this.yurtdisiDemurajDoviz = options['yurtdisiDemurajDoviz'];
    this.yurtdisiRoyaltiDoviz = options['yurtdisiRoyaltiDoviz'];
    this.yurtdisiFaizDoviz = options['yurtdisiFaizDoviz'];
    this.yurtdisiDigerDoviz = options['yurtdisiDigerDoviz'];
    this.digerAciklama = options['digerAciklama'];
    this.isleminNiteligi = options['isleminNiteligi'];
    this.esyaninGirisCikisAmaci = options['esyaninGirisCikisAmaci'];
    this.esyaninGirisCikisAmaciAciklama = options['esyaninGirisCikisAmaciAciklama'];
    this.odemeSekil = options['odemeSekil'];
// TODO enum
    this.stmBagliIl = options['stmBagliIl'];
    // endregion


    if (options['detayliBeyanTamamlayiciList'] && isArray(options['detayliBeyanTamamlayiciList']) && options['detayliBeyanTamamlayiciList'].length > 0) {
      this.detayliBeyanTamamlayiciList = Array<DetayliBeyanTamamlayiciModel>();
      options['detayliBeyanTamamlayiciList'].forEach(tamamlayici => {
        this.detayliBeyanTamamlayiciList.push(new DetayliBeyanTamamlayiciModel(tamamlayici));
      });
    }

    if (options['tcgbAcmaKapatmaList'] && isArray(options['tcgbAcmaKapatmaList']) && options['tcgbAcmaKapatmaList'].length > 0) {
      this.tcgbAcmaKapatmaList = Array<TcgbAcmaKapatmaModel>();
      options['tcgbAcmaKapatmaList'].forEach(acma => {
        this.tcgbAcmaKapatmaList.push(new TcgbAcmaKapatmaModel(acma));
      });
    }

    if (options['detayliBeyanMarkaList'] && isArray(options['detayliBeyanMarkaList']) && options['detayliBeyanMarkaList'].length > 0) {
      this.detayliBeyanMarkaList = Array<DetayliBeyanMarkaModel>();
      options['detayliBeyanMarkaList'].forEach(marka => {
        this.detayliBeyanMarkaList.push(new DetayliBeyanMarkaModel(marka));
      });
    }

    if (options['detayliBeyanKonteynerList'] && isArray(options['detayliBeyanKonteynerList']) && options['detayliBeyanKonteynerList'].length > 0) {
      this.detayliBeyanKonteynerList = Array<DetayliBeyanKonteynerModel>();
      options['detayliBeyanKonteynerList'].forEach(konteyner => {
        this.detayliBeyanKonteynerList.push(new DetayliBeyanKonteynerModel(konteyner));
      });
    }

    // VergiMuafiyetleri

    if (options['havacilikYakitTuruList'] && isArray(options['havacilikYakitTuruList']) && options['havacilikYakitTuruList'].length > 0) {
      this.havacilikYakitTuruList = Array<HavacilikYakitTuruModel>();
      options['havacilikYakitTuruList'].forEach(havacilik => {
        this.havacilikYakitTuruList.push(new HavacilikYakitTuruModel(havacilik));
      });
    }

    // detayliBeyanOdemeSekilList
    if (options['detayliBeyanKalemOdemeSekil']) {
      this.detayliBeyanKalemOdemeSekil = Array<OdemeSekliModel>();
      options['detayliBeyanKalemOdemeSekil'].forEach(odemeSekli => {
        this.detayliBeyanKalemOdemeSekil.push(new OdemeSekliModel(odemeSekli));
      });
    }

  }
}
