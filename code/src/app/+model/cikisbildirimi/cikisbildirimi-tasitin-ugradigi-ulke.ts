import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { LimanKodModel } from '../enum/limankod.model';
import { UlkeModel } from '../enum/ulke.model';

export class CikisbildirimiTasitinUgradigiUlke {


  @DnXmlModel('id', 'LimanYerAdi')
  limanKod: LimanKodModel;
  @DnXmlModel('id', 'UlkeKodu')
  ulkeKod: UlkeModel;
  @DnXmlElement('HareketTarihSaati')
  hareketTarihTescil: string;


  constructor(options: {}
                = {}) {
    this.limanKod = options['limanKod'] === undefined ? undefined : new LimanKodModel(options['limanKod']);
    this.ulkeKod = options['ulkeKod'] === undefined ? undefined : new UlkeModel(options['ulkeKod']);
    this.hareketTarihTescil = options['hareketTarihTescil'];
  }
}
