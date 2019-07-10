import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from '@dinazor/core';
import { DetayliBeyanFirmaModel } from 'app/+model/detaylibeyan/detaylibeyan-firma.model';
import { DnXmlElement, DnXmlIgnore, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { AntrepoKodModel } from '../enum/antrepokod.model';
import { BasitlestirilmisUsulKodModel } from '../enum/basitlestirilmis-usul-kod.model';
import { DovizModel } from '../enum/doviz.model';
import { GumrukIdaresiModel } from '../enum/gumrukidaresi.model';
import { IslemNiteligiModel } from '../enum/islem-niteligi.model';
import { OdemeSekliModel } from '../enum/odemesekli.model';
import { ModelBase } from '../model';
import { DetayliBeyanDokumanModel } from './detaylibeyan-dokuman.model';
import { DetayliBeyanKalemModel } from './detaylibeyan-kalem.model';
import { DetayliBeyanKiymetModel } from './detaylibeyan-kiymet.model';
import { DetayliBeyanOzetBeyanModel } from './detaylibeyan-ozetbeyan.model';
import { DetayliBeyanSoruModel } from './detaylibeyan-soru.model';
import { DetayliBeyanTeminatModel } from './detaylibeyan-teminat.model';
import { DetayliBeyanVergiModel } from './detaylibeyan-vergi.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanBilgiModel extends ModelBase {

  // region Properties
  @DnXmlElement('Kullanici_kodu')
  kullaniciKodu: string;

  @DnXmlElement('Beyanname_no')
  beyannameNo: string;

  @DnXmlElement('Rejim')
  rejimKod: string;

  @DnXmlElement('GUMRUK')
  gumrukIdaresi: string;

  @DnXmlElement('Basitlestirilmis_usul')
  basitlestirilmisUsulKod: BasitlestirilmisUsulKodModel;

  @DnXmlElement('Yuk_belgeleri_sayisi')
  yukBelgeleriSayisi: number;

  @DnXmlElement('Kap_adedi')
  kapAdedi: number;

  @DnXmlElement('Ticaret_ulkesi')
  ticaretYapilanUlke: string;

  @DnXmlElement('Referans_no')
  refNo: string;

  @DnXmlElement('Birlik_kayit_numarasi')
  birlikKayitNumarasi: string;

  @DnXmlElement('Birlik_kripto_numarasi')
  birlikKriptosu: string;

  @DnXmlElement('Cikis_ulkesi')
  cikisUlkesi: string;

  @DnXmlElement('Gidecegi_ulke')
  gidecegiUlke: string;

  @DnXmlElement('Gidecegi_sevk_ulkesi')
  gidecegiSevkUlkesi: string;

  @DnXmlElement('Cikistaki_aracin_tipi')
  cikistakiAracinTasimaAraciKodu: string;

  @DnXmlElement('Cikistaki_aracin_kimligi')
  cikistakiAracinTasimaAraciAdi: string;

  @DnXmlElement('Cikistaki_aracin_ulkesi')
  cikistakiAracinUlkesi: string;

  @DnXmlElement('Teslim_sekli')
  teslimSekli: string;

  @DnXmlElement('Teslim_yeri')
  teslimYeri: string;

  @DnXmlElement('Sinirdaki_aracin_tipi')
  sinirdakiAracinTasimaAraciKodu: string;

  @DnXmlElement('Sinirdaki_aracin_kimligi')
  sinirdakiAracinTasimaAraciAdi: string;

  @DnXmlElement('Sinirdaki_aracin_ulkesi')
  sinirdakiAracinUlkesi: string;

  @DnXmlElement('Toplam_fatura')
  toplamFaturaBedeli: number;

  @DnXmlElement('Toplam_fatura_dovizi')
  toplamFaturaBedeliDoviz: string;

  @DnXmlElement('Toplam_navlun')
  navlunBedeli: number;

  @DnXmlElement('Toplan_navlun_dovizi')
  navlunBedeliDoviz: string;

  @DnXmlElement('Sinirdaki_tasima_sekli')
  sinirdakiTasimaSekli: string;

  @DnXmlElement('Alici_satici_iliskisi')
  aliciSaticiIliskisi: string;

  @DnXmlElement('Toplam_sigorta')
  sigortaBedeli: number;

  @DnXmlElement('Toplam_sigorta_dovizi')
  sigortaBedeliDoviz: string;

  @DnXmlElement('Yukleme_bosaltma_yeri')
  yuklemeBosaltmaYeri: string;

  @DnXmlElement('Toplam_yurt_disi_harcamalar')
  yurtdisiDiger: number;

  @DnXmlElement('Toplam_yurt_disi_harcamalarin_dovizi')
  yurtdisiDigerDoviz: string;

  @DnXmlElement('Toplam_yurt_ici_harcamalar')
  yurticiDiger: number;

  @DnXmlIgnore()
  yurticiDigerDoviz: DovizModel;

  @DnXmlElement('Banka_kodu')
  finansalveBankacilikVerileri: string;

  @DnXmlElement('Esyanin_bulundugu_yer')
  esyaninBulunduguYer: string;

  @DnXmlElement('Varis_gumruk_idaresi')
  varisGumrukIdaresi: GumrukIdaresiModel;

  @DnXmlElement('Antrepo_kodu')
  antrepoKod: AntrepoKodModel;

  @DnXmlElement('Tasarlanan_guzergah')
  tasarlananGuzergah: string;

  @DnXmlElement('Telafi_edici_vergi')
  telafiEdiciVergi: number;

  @DnXmlElement('Giris_gumruk_idaresi')
  girisCikisGumrukIdaresi: GumrukIdaresiModel;

  @DnXmlElement('Islemin_niteligi')
  isleminNiteligi: IslemNiteligiModel;

  @DnXmlElement('Aciklamalar')
  aciklamalar: string;

  @DnXmlElement('Referans_tarihi')
  referansTarihi: string;

  @DnXmlElement('Konteyner')
  isKonteyner: string;

  // TODO Bunlar Ne
  @DnXmlElement('Odeme')
  odeme: string;

  @DnXmlElement('Odeme_araci')
  odemeAraci: string;

  @DnXmlElement('Musavir_referansi')
  musavirReferansi: string;

  @DnXmlModel('vergiNo', 'Gonderici_vergi_no')
  gondericiIhracatciFirma: DetayliBeyanFirmaModel;

  @DnXmlModel('vergiNo', 'Alici_vergi_no')
  aliciIthalatciFirma: DetayliBeyanFirmaModel;

  @DnXmlModel('vergiNo', 'Beyan_sahibi_vergi_no')
  beyanSahibiTemsilciFirma: DetayliBeyanFirmaModel;

  @DnXmlModel('vergiNo', 'Musavir_vergi_no')
  maliMusavirFirma: DetayliBeyanFirmaModel;

  @DnXmlModel('vergiNo', 'Asil_sorumlu_vergi_no')
  asilSorumluFirma: DetayliBeyanFirmaModel;

  // @DnXmlModel('vergiNo', 'Firma_bilgi')
  // ImzaSahibiFirma: FirmaModel;

  @DnXmlElement('mail1')
  mail1: string;

  @DnXmlElement('mobil1')
  phone1: string;

  @DnXmlElement('mail2')
  mail2: string;

  @DnXmlElement('mobil2')
  phone2: string;

  @DnXmlElement('mail3')
  mail3: string;

  @DnXmlIgnore()
  tescilTarihi: Date;

  @DnXmlIgnore()
  onayTarihi: Date;

  @DnXmlIgnore()
  kapanmaTarihi: Date;
  // endregion

  @DnXmlElement('Firma_bilgi')
  @DnXmlRoot('firma')
  firmaBilgiList: DetayliBeyanFirmaModel[];

  @DnXmlElement('Teminat')
  @DnXmlRoot('Teminat')
  detayliBeyanTeminatList: DetayliBeyanTeminatModel[];

  @DnXmlElement('Ozetbeyanlar')
  @DnXmlRoot('Ozetbeyan')
  detayliBeyanOzetBeyanList: DetayliBeyanOzetBeyanModel[];

  @DnXmlElement('Kalemler')
  @DnXmlRoot('kalem')
  detayliBeyanKalemList: DetayliBeyanKalemModel[];

  @DnXmlElement('Sorular_cevaplar')
  @DnXmlRoot('Soru_Cevap')
  detayliBeyanSoruList: DetayliBeyanSoruModel[];

  @DnXmlElement('Dokumanlar')
  @DnXmlRoot('Dokuman')
  detayliBeyanDokumanList: DetayliBeyanDokumanModel[];

  @DnXmlElement('Vergiler')
  @DnXmlRoot('Vergi')
  detayliBeyanVergiList: DetayliBeyanVergiModel[];

  @DnXmlElement('KiymetBildirim')
  @DnXmlRoot('Kiymet')
  detayliBeyanKiymetList: DetayliBeyanKiymetModel[];





  /*@DnXmlElement('OdemeSekli')
  odemeSekil: string;*/


  constructor(options: {} = {}) {
    super();
    this.kullaniciKodu = options['kullaniciKodu'];
    this.beyannameNo = options['beyannameNo'];
    this.rejimKod = options['rejimKod'];
    this.gumrukIdaresi = options['gumrukIdaresi'];
    this.basitlestirilmisUsulKod = options['basitlestirilmisUsulKod'];
    this.yukBelgeleriSayisi = options['yukBelgeleriSayisi'];
    this.kapAdedi = options['kapAdedi'];
    this.ticaretYapilanUlke = options['ticaretYapilanUlke'];
    this.refNo = options['refNo'];
    this.birlikKayitNumarasi = options['birlikKayitNumarasi'];
    this.birlikKriptosu = options['birlikKriptosu'];
    this.cikisUlkesi = options['cikisUlkesi'];
    this.gidecegiUlke = options['gidecegiUlke'];

    this.gidecegiSevkUlkesi = options['gidecegiSevkUlkesi'];
    this.cikistakiAracinTasimaAraciKodu = options['cikistakiAracinTasimaAraciKodu'];
    this.cikistakiAracinTasimaAraciAdi = options['cikistakiAracinTasimaAraciAdi'];
    this.cikistakiAracinUlkesi = options['cikistakiAracinUlkesi'];
    this.teslimSekli = options['teslimSekli'];
    this.teslimYeri = options['teslimYeri'];
    this.sinirdakiAracinTasimaAraciKodu = options['sinirdakiAracinTasimaAraciKodu'];
    this.sinirdakiAracinTasimaAraciAdi = options['sinirdakiAracinTasimaAraciAdi'];
    this.sinirdakiAracinUlkesi = options['sinirdakiAracinUlkesi'];
    this.toplamFaturaBedeli = options['toplamFaturaBedeli'];
    this.toplamFaturaBedeliDoviz = options['toplamFaturaBedeliDoviz'];
    this.navlunBedeli = options['navlunBedeli'];
    this.navlunBedeliDoviz = options['navlunBedeliDoviz'];
    this.sinirdakiTasimaSekli = options['sinirdakiTasimaSekli'];
    this.aliciSaticiIliskisi = options['aliciSaticiIliskisi'];
    this.sigortaBedeli = options['sigortaBedeli'];
    this.sigortaBedeliDoviz = options['sigortaBedeliDoviz'];
    this.yuklemeBosaltmaYeri = options['yuklemeBosaltmaYeri'];
    this.yurtdisiDiger = options['yurtdisiDiger'];
    this.yurtdisiDigerDoviz = options['yurtdisiDigerDoviz'];
    this.yurticiDiger = options['yurticiDiger'];
    this.yurticiDigerDoviz = options['yurticiDigerDoviz'];
    this.finansalveBankacilikVerileri = options['finansalveBankacilikVerileri'];
    this.esyaninBulunduguYer = options['esyaninBulunduguYer'];
    this.varisGumrukIdaresi = options['varisGumrukIdaresi'];
    this.antrepoKod = options['antrepoKod'];
    this.tasarlananGuzergah = options['tasarlananGuzergah'];
    this.telafiEdiciVergi = options['telafiEdiciVergi'];
    this.girisCikisGumrukIdaresi = options['girisCikisGumrukIdaresi'];
    this.isleminNiteligi = options['isleminNiteligi'];
    this.aciklamalar = options['aciklamalar'];
    this.referansTarihi = options['referansTarihi'];
    if (options['isKonteyner'] == 1) {
      this.isKonteyner = 'EVET';
    } else if (options['isKonteyner'] == 2) {
      this.isKonteyner = 'HAYIR';
    }
    this.odeme = options['odeme'];
    this.odemeAraci = options['odemeAraci'];
    this.musavirReferansi = options['musavirReferansi'];

    this.gondericiIhracatciFirma = isNullOrUndefined(options['gondericiIhracatciFirma']) ? undefined : new DetayliBeyanFirmaModel(options['gondericiIhracatciFirma']);
    this.aliciIthalatciFirma = isNullOrUndefined(options['aliciIthalatciFirma']) ? undefined : new DetayliBeyanFirmaModel(options['aliciIthalatciFirma']);
    this.beyanSahibiTemsilciFirma = isNullOrUndefined(options['beyanSahibiTemsilciFirma']) ? undefined : new DetayliBeyanFirmaModel(options['beyanSahibiTemsilciFirma']);
    this.maliMusavirFirma = isNullOrUndefined(options['maliMusavirFirma']) ? undefined : new DetayliBeyanFirmaModel(options['maliMusavirFirma']);
    this.asilSorumluFirma = isNullOrUndefined(options['asilSorumluFirma']) ? undefined : new DetayliBeyanFirmaModel(options['asilSorumluFirma']);
    // ImzaSahibiFirma: FirmaModel;
    this.mail1 = options['mail1'];
    this.phone1 = options['phone1'];
    this.mail2 = options['mail2'];
    this.phone2 = options['phone2'];
    this.mail3 = options['mail3'];
    /*
        this.tescilTarihi = options['tescilTarihi'];
        this.onayTarihi = options['onayTarihi'];
        this.kapanmaTarihi = options['kapanmaTarihi'];
    */
    // endregion

    // endregion

    // region Firma Bilgi List
    // Firma Bilgi
    if (!isNullOrUndefined(options['gondericiIhracatciFirma']) && isNullOrUndefinedOrEmpty(options['gondericiIhracatciFirma']['vergiNo'])) {
      if (isNullOrUndefined(options['firmaBilgiList'])) this.firmaBilgiList = Array<DetayliBeyanFirmaModel>();
      options['gondericiIhracatciFirma']['tip'] = 'Gonderici';
      this.firmaBilgiList.push(new DetayliBeyanFirmaModel(options['gondericiIhracatciFirma']));
    }
    if (!isNullOrUndefined(options['aliciIthalatciFirma']) && isNullOrUndefinedOrEmpty(options['aliciIthalatciFirma']['vergiNo'])) {
      if (isNullOrUndefined(options['firmaBilgiList'])) this.firmaBilgiList = Array<DetayliBeyanFirmaModel>();
      options['aliciIthalatciFirma']['tip'] = 'Alici';
      this.firmaBilgiList.push(new DetayliBeyanFirmaModel(options['aliciIthalatciFirma']));
    }

    // DigerGonderici
    // endregion

    if (options['detayliBeyanTeminatList']) {
      this.detayliBeyanTeminatList = Array<DetayliBeyanTeminatModel>();
      options['detayliBeyanTeminatList'].forEach(teminat => {
        this.detayliBeyanTeminatList.push(new DetayliBeyanTeminatModel(teminat));
      });
    }

    if (options['detayliBeyanOzetBeyanList']) {
      this.detayliBeyanOzetBeyanList = Array<DetayliBeyanOzetBeyanModel>();
      options['detayliBeyanOzetBeyanList'].forEach(ozetbeyan => {
        this.detayliBeyanOzetBeyanList.push(new DetayliBeyanOzetBeyanModel(ozetbeyan));
      });
    }

    if (options['detayliBeyanKalemList']) {
      this.detayliBeyanKalemList = Array<DetayliBeyanKalemModel>();
      options['detayliBeyanKalemList'].forEach(kalem => {
        this.detayliBeyanKalemList.push(new DetayliBeyanKalemModel(kalem));
      });
    }

    if (options['detayliBeyanSoruList']) {
      this.detayliBeyanSoruList = Array<DetayliBeyanSoruModel>();
      options['detayliBeyanSoruList'].forEach(soru => {
        this.detayliBeyanSoruList.push(new DetayliBeyanSoruModel(soru));
      });
    }

    if (options['detayliBeyanDokumanList']) {
      this.detayliBeyanDokumanList = Array<DetayliBeyanDokumanModel>();
      options['detayliBeyanDokumanList'].forEach(dokuman => {
        this.detayliBeyanDokumanList.push(new DetayliBeyanDokumanModel(dokuman));
      });
    }

    if (options['detayliBeyanVergiList']) {
      this.detayliBeyanVergiList = Array<DetayliBeyanVergiModel>();
      options['detayliBeyanVergiList'].forEach(vergi => {
        this.detayliBeyanVergiList.push(new DetayliBeyanVergiModel(vergi));
      });
    }

    if (options['detayliBeyanKiymetList']) {
      this.detayliBeyanKiymetList = Array<DetayliBeyanKiymetModel>();
      options['detayliBeyanKiymetList'].forEach(kiymet => {
        this.detayliBeyanKiymetList.push(new DetayliBeyanKiymetModel(kiymet));
      });
    }

  }
}
