import { TeminatSekliModel } from '../enum/teminat-sekli.model';
import { isNullOrUndefined } from '@dinazor/core';
import { DnXmlElement, DnXmlModel } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
/**
 * Created by cabbar on 23.05.2017.
 */
export class DetayliBeyanTeminatModel extends ModelBase{

  @DnXmlElement('Teminat_sekli')
  teminatSekli: string;

  @DnXmlElement('Teminat_orani')
  teminatOrani: number;

  @DnXmlElement('Banka_mektubu_tutari')
  bankaMektubuTutari: number;

  @DnXmlElement('Nakdi_teminat_tutari')
  nakdiTeminatTutari: number;

  @DnXmlElement('Diger_tutar')
  digerTutar: number;

  @DnXmlElement('Global_teminat_no')
  globalTeminatNo: string;

  @DnXmlElement('Aciklama')
  aciklama: string;

  @DnXmlElement('Diger_tutar_referansi')
  digerTutarReferansi: string;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }

}
