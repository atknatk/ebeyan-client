import { DnXmlElement } from '../../shared/utils/dn-serialize';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanKiymetKalemModel {

  @DnXmlElement('KiymetKalemNo')
  kiymetKalemNo: string;

  @DnXmlElement('BeyannameKalemNo')
  beyannemeKalemNo: string;

  @DnXmlElement('DolayliOdeme')
  dolayliOdeme: number;

  @DnXmlElement('Komisyon')
  komisyon: number;

  @DnXmlElement('Tellaliye')
  tellaliye: number;

  @DnXmlElement('KapAmbalajBedeli')
  kapAmbalajBedeli: number;

  @DnXmlElement('IthalaKatilanMalzeme')
  ithalaKatilanMalzeme: number;

  @DnXmlElement('IthalaUretimAraclar')
  ithalaUretimAraclar: number;

  @DnXmlElement('IthalaUretimTuketimMalzemesi')
  ithalaUretimTuketimMalzemesi: number;

  @DnXmlElement('PlanTaslak')
  planTaslak: number;

  @DnXmlElement('RoyaltiLisans')
  royaltiLisans: number;

  @DnXmlElement('DolayliIntikal')
  dolayliIntikal: number;

  @DnXmlElement('Nakliye')
  nakliye: number;

  @DnXmlElement('Sigorta')
  sigorta: number;

  @DnXmlElement('GirisSonrasiNakliye')
  girisSonrasiNakliye: number;

  @DnXmlElement('TeknikYardim')
  teknikYardim: number;

  @DnXmlElement('DigerOdemeler')
  digerOdemeler: number;

  @DnXmlElement('DigerOdemelerNiteligi')
  digerOdemelerNiteligi: string;

  @DnXmlElement('VergiHarcFon')
  vergiHarcFon: number;

  constructor(options: {} = {}) {
    this.kiymetKalemNo = options['kiymetKalemNo'];
    this.beyannemeKalemNo = options['beyannemeKalemNo'];
    this.dolayliOdeme = options['dolayliOdeme'];
    this.komisyon = options['komisyon'];
    this.tellaliye = options['tellaliye'];
    this.kapAmbalajBedeli = options['kapAmbalajBedeli'];
    this.ithalaKatilanMalzeme = options['ithalaKatilanMalzeme'];
    this.ithalaUretimAraclar = options['ithalaUretimAraclar'];
    this.ithalaUretimTuketimMalzemesi = options['ithalaUretimTuketimMalzemesi'];
    this.planTaslak = options['planTaslak'];
    this.royaltiLisans = options['royaltiLisans'];
    this.dolayliIntikal = options['dolayliIntikal'];
    this.nakliye = options['nakliye'];
    this.sigorta = options['sigorta'];
    this.girisSonrasiNakliye = options['girisSonrasiNakliye'];
    this.teknikYardim = options['teknikYardim'];
    this.digerOdemeler = options['digerOdemeler'];
    this.digerOdemelerNiteligi = options['digerOdemelerNiteligi'];
    this.vergiHarcFon = options['vergiHarcFon'];

  }
}
