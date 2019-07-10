import { ModelBase } from '../../+model/model';

export interface IKalemDefaultModel {
  kalemNo?: number;
  id?: number;
  idDetayliBeyan: number;
  rejimKod: string;
  bsKod: string;
  teslimSekli: string;
}

export class KalemDefaultModel extends ModelBase {
  kalemNo?: number;
  id: number = 0;
  idDetayliBeyan: number;
  rejimKod: string;
  bsKod: string;
  teslimSekli: string;

  constructor(options?: {}) {
    super();
    this.equalizer(options);
  }
}
