import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { IhracatlaIlgiliBeyanTipModel } from '../enum/ihracatla-iligili-beyan-tip.model';

export class CikisbildirimiIhracatModel {


  @DnXmlElement('BrutAgirlik')
  brutAgirlik: number;

  @DnXmlElement('KapAdedi')
  kapAdet: number;

  @DnXmlElement('Numarasi')
  numarasi: string;

  @DnXmlElement('ParcaliMi')
  isParcali: boolean;

  @DnXmlModel('id', 'Tipi')
  ihracatIlgiliBeyanTip: IhracatlaIlgiliBeyanTipModel;


  constructor(options: {}
                = {}) {
    this.brutAgirlik = options['brutAgirlik'];
    this.kapAdet = options['kapAdet'];
    this.numarasi = options['numarasi'];
    this.isParcali = options['isParcali'];
    this.ihracatIlgiliBeyanTip = options['ihracatIlgiliBeyanTip'] === undefined ? undefined : new IhracatlaIlgiliBeyanTipModel(options['ihracatIlgiliBeyanTip']);
  }
}
