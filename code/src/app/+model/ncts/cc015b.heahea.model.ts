/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';

export class HEAHEAModel {

  @DnXmlElementPascal()
  refNumHEA4: string;

  @DnXmlElementPascal()
  typOfDecHEA24: string;

  @DnXmlElementPascal()
  couOfDesCodHEA30: string;

  @DnXmlElementPascal()
  agrLocOfGooCodHEA38: string;

  @DnXmlElementPascal()
  agrLocOfGooHEA39: string;

  @DnXmlElementPascal()
  agrLocOfGooHEA39LNG: string;

  @DnXmlElementPascal()
  autLocOfGooCodHEA41: string;

  @DnXmlElementPascal()
  plaOfLoaCodHEA46: string;

  @DnXmlElementPascal()
  couOfDisCodHEA55: string;

  @DnXmlElementPascal()
  cusSubPlaHEA66: string;

  @DnXmlElementPascal()
  inlTraModHEA75: number;

  @DnXmlElementPascal()
  traModAtBorHEA76: number;

  @DnXmlElementPascal()
  ideOfMeaOfTraAtDHEA78: string;

  @DnXmlElementPascal()
  ideOfMeaOfTraAtDHEA78LNG: string;

  @DnXmlElementPascal()
  natOfMeaOfTraAtDHEA80: string;

  @DnXmlElementPascal()
  ideOfMeaOfTraCroHEA85: string;

  @DnXmlElementPascal()
  ideOfMeaOfTraCroHEA85LNG: string;

  @DnXmlElementPascal()
  natOfMeaOfTraCroHEA87: string;

  @DnXmlElementPascal()
  typOfMeaOfTraCroHEA88: number;

  @DnXmlElementPascal()
  conIndHEA96: string;

  @DnXmlElementPascal()
  diaLanIndAtDepHEA254: string;

  @DnXmlElementPascal()
  nCTSAccDocHEA601LNG: string;

  @DnXmlElementPascal()
  totNumOfIteHEA305: number;

  @DnXmlElementPascal()
  totNumOfPacHEA306: number;

  @DnXmlElementPascal()
  totGroMasHEA307: number;

  @DnXmlElementPascal()
  decDatHEA383: string;

  @DnXmlElementPascal()
  decPlaHEA394: string;

  @DnXmlElementPascal()
  decPlaHEA394LNG: string;

  @DnXmlElementPascal()
  speCirIndHEA1: string;

  @DnXmlElementPascal()
  traChaMetOfPayHEA1: string;

  @DnXmlElementPascal()
  comRefNumHEA: string;

  @DnXmlElementPascal()
  secHEA358: string;

  @DnXmlElementPascal()
  conRefNumHEA: string;

  @DnXmlElementPascal()
  codPlUnHEA357: string;

  @DnXmlElementPascal()
  codPlUnHEA357LNG: string;

  @DnXmlElementPascal()
  truckId2: string;

  @DnXmlElementPascal()
  truckId3: string;

  @DnXmlElementPascal()
  damgaVergi: number;


  constructor(options: {} = {}) {
    this.refNumHEA4 = options['refNumHEA4'];
    this.typOfDecHEA24 = options['typOfDecHEA24'];
    this.couOfDesCodHEA30 = options['couOfDesCodHEA30'];
    this.agrLocOfGooCodHEA38 = options['agrLocOfGooCodHEA38'];
    this.agrLocOfGooHEA39 = options['agrLocOfGooHEA39'];
    this.agrLocOfGooHEA39LNG = options['agrLocOfGooHEA39LNG'];
    this.autLocOfGooCodHEA41 = options['autLocOfGooCodHEA41'];
    this.plaOfLoaCodHEA46 = options['plaOfLoaCodHEA46'];
    this.couOfDisCodHEA55 = options['couOfDisCodHEA55'];
    this.cusSubPlaHEA66 = options['cusSubPlaHEA66'];
    this.inlTraModHEA75 = options['inlTraModHEA75'];
    this.traModAtBorHEA76 = options['traModAtBorHEA76'];
    this.ideOfMeaOfTraAtDHEA78 = options['ideOfMeaOfTraAtDHEA78'];
    this.ideOfMeaOfTraAtDHEA78LNG = options['ideOfMeaOfTraAtDHEA78LNG'];
    this.natOfMeaOfTraAtDHEA80 = options['natOfMeaOfTraAtDHEA80'];
    this.ideOfMeaOfTraCroHEA85 = options['ideOfMeaOfTraCroHEA85'];
    this.ideOfMeaOfTraCroHEA85LNG = options['ideOfMeaOfTraCroHEA85LNG'];
    this.natOfMeaOfTraCroHEA87 = options['natOfMeaOfTraCroHEA87'];
    this.typOfMeaOfTraCroHEA88 = options['typOfMeaOfTraCroHEA88'];
    this.conIndHEA96 = options['conIndHEA96'];
    this.diaLanIndAtDepHEA254 = options['diaLanIndAtDepHEA254'];
    this.nCTSAccDocHEA601LNG = options['nCTSAccDocHEA601LNG'];
    this.totNumOfIteHEA305 = options['totNumOfIteHEA305'];
    this.totNumOfPacHEA306 = options['totNumOfPacHEA306'];
    this.totGroMasHEA307 = options['totGroMasHEA307'];
    this.decDatHEA383 = options['decDatHEA383'];
    this.decPlaHEA394 = options['decPlaHEA394'];
    this.decPlaHEA394LNG = options['decPlaHEA394LNG'];
    this.speCirIndHEA1 = options['speCirIndHEA1'];
    this.traChaMetOfPayHEA1 = options['traChaMetOfPayHEA1'];
    this.comRefNumHEA = options['comRefNumHEA'];
    this.secHEA358 = options['secHEA358'];
    this.conRefNumHEA = options['conRefNumHEA'];
    this.codPlUnHEA357 = options['codPlUnHEA357'];
    this.codPlUnHEA357LNG = options['codPlUnHEA357LNG'];
    this.truckId2 = options['truckId2'];
    this.truckId3 = options['truckId3'];
    this.damgaVergi = options['damgaVergi'];
  }
}
