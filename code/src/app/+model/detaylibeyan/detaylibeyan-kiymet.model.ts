import { DnXmlElement, DnXmlModel, DnXmlRoot } from '../../shared/utils/dn-serialize';
import { YesNoModel } from '../enum/yes-no.model';
import { DetayliBeyanKiymetKalemModel } from './detaylibeyan-kiymet-kalem.model';

/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanKiymetModel {

  @DnXmlElement('TeslimSekli')
  teslimSekli: string;

  @DnXmlElement('FaturaTarihiSayisi')
  faturaTarihiSayisi: string;

  @DnXmlElement('SozlesmeTarihiSayisi')
  sozlesmeTarihiSayisi: string;

  @DnXmlElement('GumrukIdaresiKarari')
  gumrukIdaresiKarari: string;

  @DnXmlElement('AliciSatici')
  aliciSatici: string;

  @DnXmlElement('Munasebet')
  munasebet: string;

  @DnXmlElement('Emsal')
  emsal: string;

  @DnXmlElement('AliciSaticiAyrintilar')
  aliciSaticiAyrintilar: string;

  @DnXmlElement('Kisitlamalar')
  kisitlamalar: string;

  @DnXmlElement('Edim')
  edim: string;

  @DnXmlElement('KisitlamalarAyrintilar')
  kisitlamalarAyrintilar: string;

  @DnXmlElement('Royalti')
  royalti: string;

  @DnXmlElement('RoyaltiKosullar')
  royaltiKosullar: string;

  @DnXmlElement('SaticiyaIntikal')
  saticiyaIntikal: string;

  @DnXmlElement('SaticiyaIntikalKosullar')
  saticiyaIntikalKosullar: string;

  @DnXmlElement('SehirYer')
  sehirYer: string;

  @DnXmlElement('Taahutname')
  taahutname: string;

  @DnXmlElement('KiymetKalemler')
  @DnXmlRoot('KiymetKalem')
  detayliBeyanKiymetKalemList: DetayliBeyanKiymetKalemModel[];


  constructor(options: {} = {}) {
    this.teslimSekli = options['teslimSekli'];
    this.faturaTarihiSayisi = options['faturaTarihiSayisi'];
    this.sozlesmeTarihiSayisi = options['sozlesmeTarihiSayisi'];
    this.gumrukIdaresiKarari = options['gumrukIdaresiKarari'];

    if (options['aliciSatici'] == 1) {
      this.aliciSatici = 'VAR';
    } else if (options['aliciSatici'] == 2) {
      this.aliciSatici = 'YOK';
    }

    if (options['munasebet'] == 1) {
      this.munasebet = 'EVET';
    } else if (options['munasebet'] == 2) {
      this.munasebet = 'HAYIR';
    }

    if (options['emsal'] == 1) {
      this.emsal = 'EVET';
    } else if (options['emsal'] == 2) {
      this.emsal = 'HAYIR';
    }

    this.aliciSaticiAyrintilar = options['aliciSaticiAyrintilar'];

    if (options['kisitlamalar'] == 1) {
      this.kisitlamalar = 'EVET';
    } else if (options['kisitlamalar'] == 2) {
      this.kisitlamalar = 'HAYIR';
    }

    if (options['edim'] == 1) {
      this.edim = 'EVET';
    } else if (options['edim'] == 2) {
      this.edim = 'HAYIR';
    }

    this.kisitlamalarAyrintilar = options['kisitlamalarAyrintilar'];
    if (options['royalti'] == 1) {
      this.royalti = 'EVET';
    } else if (options['royalti'] == 2) {
      this.royalti = 'HAYIR';
    }
    this.royaltiKosullar = options['royaltiKosullar'];

    if (options['saticiyaIntikal'] == 1) {
      this.saticiyaIntikal = 'EVET';
    } else if (options['saticiyaIntikal'] == 2) {
      this.saticiyaIntikal = 'HAYIR';
    }

    this.saticiyaIntikalKosullar = options['saticiyaIntikalKosullar'];
    this.sehirYer = options['sehirYer'];
    this.taahutname = options['taahutname'];

    if (options['detayliBeyanKiymetKalemList']) {
      this.detayliBeyanKiymetKalemList = Array<DetayliBeyanKiymetKalemModel>();
      options['detayliBeyanKiymetKalemList'].forEach(kiymetKalem => {
        this.detayliBeyanKiymetKalemList.push(new DetayliBeyanKiymetKalemModel(kiymetKalem));
      });
    }

  }
}
