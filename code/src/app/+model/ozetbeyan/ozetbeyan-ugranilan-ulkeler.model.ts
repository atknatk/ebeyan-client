import {DnXmlModel} from '../../shared/utils/dn-serialize';
import {LimanKodModel} from '../enum/limankod.model';
import {UlkeModel} from '../enum/ulke.model';
export class OzetbeyanUgranilanUlkelerModel {


  @DnXmlModel('id', 'LimanYerAdi')
  limanKod: LimanKodModel;
  @DnXmlModel('id', 'UlkeKodu')
  ulkeKod: UlkeModel;


  constructor(options: {}
                = {}) {
    this.limanKod = options['limanKod'] === undefined ? undefined : new LimanKodModel(options['limanKod']);
    this.ulkeKod = options['ulkeKod'] === undefined ? undefined : new UlkeModel(options['ulkeKod']);
  }
}
