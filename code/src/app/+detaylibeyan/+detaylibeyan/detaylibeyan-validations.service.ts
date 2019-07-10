import { Injectable } from '@angular/core';
import {
  DnDisabledValidationModel,
  DnRequiredValidationModel,
  IDnValidationConditonModel,
  IDnValidationModel
} from '../../shared/utils/validation/dn-validation.model';
import { DetayliBeyanTeslimSekliValidationService } from '../validation/teslim-sekli-validations.service';

@Injectable()
export class DetayliBeyanValidationService {

  constructor(private _teslimSekli: DetayliBeyanTeslimSekliValidationService) {
  }


  public getValidations(): IDnValidationModel[] {
    const validations = Array<IDnValidationModel>();

    // Rejim Kod
    const rejimKod: IDnValidationModel = new DnRequiredValidationModel('rejimKod');
    rejimKod.conditions.push(this.validationAllwaysBut8x());
    rejimKod.conditions.push(this.rejim1x());
    rejimKod.conditions.push(this.rejim1000());
    rejimKod.conditions.push(this.rejim4x());
    rejimKod.conditions.push(this.rejim4000());
    rejimKod.conditions.push(this.rejimAntrepo());
    validations.push(rejimKod);
    // END Rejim Kod


    return validations;
  }

  private rejim1000(): IDnValidationConditonModel {
    return {
      value: item => item && item === '1000',
      validations: [
        {
          formControlName: 'basitlestirilmisUsulKod',
          baseValidation: {required: true, disabled: false},
          conditions: [{
            value: item => item === '1',
            validations: [
              new DnRequiredValidationModel('asilSorumluFirma')
            ]
          }]
        }
      ]
    };
  }

  private rejim1x(): IDnValidationConditonModel {
    return {
      value: item => item && item.indexOf('1') === 0 && item !== '1000',
      validations: [
        ...this.validationIhracat()
      ]
    };
  }

  private rejim4000(): IDnValidationConditonModel {
    return {
      value: item => item && item == '4000',
      validations: [
        ...this.validationIthalat(),
        new DnDisabledValidationModel('antrepoKod'),
        new DnDisabledValidationModel('varisGumrukIdaresi'),
        new DnDisabledValidationModel('tasarlananGuzergah'),
      ]
    };
  }

  private rejim4x(): IDnValidationConditonModel {
    return {
      value: item => item && item.indexOf('4') === 0 && item != '4071',
      validations: [
        ...this.validationIthalat()
      ]
    };
  }

  private rejimAntrepo(): IDnValidationConditonModel {
    return {
      value: item => item && (item == '4071' || item == '7100'),
      validations: [
        ...this.validationIthalat(),
        new DnRequiredValidationModel('aliciSaticiIliskisi'),
        new DnRequiredValidationModel('antrepoKod'),
      ]
    };
  }


  private validationAllwaysBut8x(): IDnValidationConditonModel {
    return {
      value: item => item && item.indexOf('8') !== 0,
      validations: [
        new DnDisabledValidationModel('asilSorumluFirma'),
        new DnRequiredValidationModel('gondericiIhracatciFirma'),
        new DnRequiredValidationModel('beyanSahibiTemsilciFirma'),
        new DnRequiredValidationModel('aliciIthalatciFirma'),
        new DnRequiredValidationModel('sinirdakiTasimaSekli'),
        new DnRequiredValidationModel('yuklemeBosaltmaYeri'),
        new DnRequiredValidationModel('esyaninBulunduguYer'),
        new DnRequiredValidationModel('gidecegiSevkUlkesi'),
        new DnRequiredValidationModel('isKonteyner'),
        new DnRequiredValidationModel('kapAdedi'),
        new DnRequiredValidationModel('toplamFaturaBedeli'),
        new DnRequiredValidationModel('toplamFaturaBedeliDoviz'),
        // new DnRequiredValidationModel('mail1'),
        // new DnRequiredValidationModel('phone1'),
        // new DnRequiredValidationModel('teslimSekli'),
        // new DnRequiredValidationModel('aliciSaticiIliskisi'),
        new DnRequiredValidationModel('teslimYeri'),
        new DnRequiredValidationModel('isleminNiteligi'),
        new DnRequiredValidationModel('ticaretYapilanUlke'), // ?
        new DnRequiredValidationModel('girisCikisGumrukIdaresi'),
        new DnRequiredValidationModel('cikistakiAracinUlkesi'),
        new DnRequiredValidationModel('cikistakiAracinTasimaAraciKodu'),
        new DnRequiredValidationModel('cikistakiAracinTasimaAraciAdi'),
        new DnRequiredValidationModel('sinirdakiAracinUlkesi'),
        new DnRequiredValidationModel('sinirdakiAracinTasimaAraciKodu'),
        new DnRequiredValidationModel('sinirdakiAracinTasimaAraciAdi'),
        // new DnRequiredValidationModel('yurtdisiDiger'),
        // new DnRequiredValidationModel('yurtdisiDigerDoviz'),
        new DnRequiredValidationModel('finansalveBankacilikVerileri'),
      ]
    };
  }

  private validationIhracat(): IDnValidationModel[] {
    return [
      new DnRequiredValidationModel('gidecegiUlke'),
      new DnDisabledValidationModel('cikisUlkesi'),
      this._teslimSekli.ihracat()
    ];
  }

  private validationIthalat(): IDnValidationModel[] {
    return [
      new DnRequiredValidationModel('aliciSaticiIliskisi'),
      new DnRequiredValidationModel('cikisUlkesi'),
      new DnDisabledValidationModel('gidecegiUlke'),
      this._teslimSekli.ithalat()
    ];
  }

}
