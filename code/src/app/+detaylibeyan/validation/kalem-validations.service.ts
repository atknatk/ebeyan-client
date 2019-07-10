import { Injectable } from '@angular/core';
import {
  DnDisabledValidationModel,
  DnOptinalValidationModel,
  DnRequiredValidationModel,
  IDnValidationConditonModel,
  IDnValidationModel
} from '../../shared/utils/validation/dn-validation.model';
import { DetayliBeyanTeslimSekliValidationService } from './teslim-sekli-validations.service';

@Injectable()
export class DetayliBeyanKalemValidationService {
  readonly rejimKodName = 'tmpRejimKod';
  readonly bsKodName = 'tmpBsKod';

  constructor(private _teslimSekli: DetayliBeyanTeslimSekliValidationService) {
  }

  public getValidations(): IDnValidationModel[] {
    const validations = Array<IDnValidationModel>();

    // En başta olması gerekenler
    validations.push(this.validationGirisCikisAmaci());
  //  validations.push(...this.validationZAlgilamaBirim());


    // Veriye göre şekillenenler
    validations.push(...this.validationAllways());
    // validations.push(...this.validationMuafiyetKod());
    validations.push(this.validationRejim());
    validations.push(this.validationBs());
    // validations.push(this.validationImalatciFirma());
    return validations;
  }

  private validationAllways(): IDnValidationModel[] {
    return [
   //   new DnDisabledValidationModel('sigortaBedeli'),
   //   new DnDisabledValidationModel('sigortaBedeliDoviz'),
  //    new DnDisabledValidationModel('navlunBedeli'),
  //    new DnDisabledValidationModel('navlunBedeliDoviz'),

      // new DnDisabledValidationModel('algilamaBirimi1'),
      // new DnDisabledValidationModel('algilamaMiktari1'),
      // new DnDisabledValidationModel('algilamaBirimi2'),
      // new DnDisabledValidationModel('algilamaMiktari2'),
      // new DnDisabledValidationModel('algilamaBirimi3'),
      // new DnDisabledValidationModel('algilamaMiktari3'),
      // new DnDisabledValidationModel('isImalatciFirma'), // ???
      // new DnDisabledValidationModel('tamamlayiciOlcuBirim'), // ???
      // new DnDisabledValidationModel('istatistikiMiktar'), // ???
      // new DnDisabledValidationModel('tarifedekiTanimi'),
      // new DnDisabledValidationModel('mahreceIade'),
      new DnDisabledValidationModel('isIkincilIslem'),
      new DnDisabledValidationModel('stmBagliIl'),

      new DnRequiredValidationModel('kalemNo'),
      new DnRequiredValidationModel('menseUlke'),
      new DnRequiredValidationModel('gtip'),
    //  new DnRequiredValidationModel('odemeSekil'),

      // new DnRequiredValidationModel('gondericiIhracatciFirma'),
      new DnRequiredValidationModel('netAgirlik'),
      new DnRequiredValidationModel('brutAgirlik'),
      new DnRequiredValidationModel('fatura'),
      new DnRequiredValidationModel('faturaDoviz'),
      new DnRequiredValidationModel('esyaNumara'),
      new DnRequiredValidationModel('esyaMarka'),
      new DnRequiredValidationModel('esyaCinsi'),
      new DnRequiredValidationModel('esyaAdet'),
      new DnRequiredValidationModel('ticariTanimi'),
      new DnRequiredValidationModel('miktar'),
      new DnRequiredValidationModel('miktarBirim'),
      new DnRequiredValidationModel('ozellik'),
      new DnRequiredValidationModel('isleminNiteligi'),

    ];
  }

  private validationAntrepo(): IDnValidationModel[] {
    return [
      new DnDisabledValidationModel('istatistikiKiymet'),
      //   new DnDisabledValidationModel('istatiskiKiymetDoviz'),
      this._teslimSekli.ithalat()
    ];
  }

  private validationBs(): IDnValidationModel {
    return {
      formControlName: this.bsKodName,
      baseValidation: {required: false, disabled: true},
      conditions: [{
        value: item => ['12', '9', '13', '14'].indexOf(item) > -1,
        validations: [
          // new DnRequiredValidationModel('Yurtiçi Gider Top.'),
          new DnRequiredValidationModel('yurticiCevreKatkiPayi'),
        ]
      }]
    };
  }

  private validationGirisCikisAmaci(): IDnValidationModel {
    return {
      formControlName: 'esyaninGirisCikisAmaci',
      baseValidation: {required: false, disabled: false},
      conditions: [{
        value: item => item == '05',
        validations: [
          new DnRequiredValidationModel('esyaninGirisCikisAmaciAciklama')
        ]
      }]
    };
  }

  private validationIhracat(): IDnValidationModel[] {
    return [
      new DnRequiredValidationModel('istatistikiKiymet'),
      // new DnRequiredValidationModel('istatiskiKiymetDoviz'),
      new DnDisabledValidationModel('uluslararasiAnlasmalar'),
      new DnDisabledValidationModel('kdv'),
      this._teslimSekli.ihracat()

    ];
  }

  private validationImalatciFirma(): IDnValidationModel {
    return {
      formControlName: 'isImalatciFirma',
      baseValidation: {required: false, disabled: false},
      conditions: [{
        value: item => item == 1,
        validations: [
          new DnRequiredValidationModel('imalatciFirma')
        ]
      }]
    };
  }

  private validationIthalat(): IDnValidationModel[] {
    return [
      new DnDisabledValidationModel('istatistikiKiymet'),
      this._teslimSekli.ithalat()
    ];
  }

  private validationIthracatTeslimSekli(): IDnValidationModel[] {
    return [
      this._teslimSekli.ihracat()
    ];
  }

  private validationMuafiyetKod(): IDnValidationModel[] {
    return [{
      formControlName: 'muafiyetKod1',
      baseValidation: {required: false, disabled: false},
      conditions: this.validationMuafiyetKodConditions()
    }, {
      formControlName: 'muafiyetKod2',
      baseValidation: {required: false, disabled: false},
      conditions: this.validationMuafiyetKodConditions()
    }, {
      formControlName: 'muafiyetKod3',
      baseValidation: {required: false, disabled: false},
      conditions: this.validationMuafiyetKodConditions()
    }, {
      formControlName: 'muafiyetKod4',
      baseValidation: {required: false, disabled: false},
      conditions: this.validationMuafiyetKodConditions()
    }];
  }

  private validationMuafiyetKodConditions(): IDnValidationConditonModel[] {
    return [{
      value: item => item && ['D1A', 'D1B', 'D1C', 'D3', 'D3A', 'D3B', 'D5', 'D5A'].indexOf(item) !== -1,
      validations: [
        new DnDisabledValidationModel('diibSatirKodu'),
      ]
    }, {
      value: item => item && ['D1A', 'D1B', 'D1C', 'D3', 'D3A', 'D3B', 'D5', 'D5A'].indexOf(item) === -1,
      validations: [
        new DnRequiredValidationModel('diibSatirKodu'),
      ]
    }, {
      value: item => item && ['STEX', 'STIM'].indexOf(item) === -1,
      validations: [
        new DnOptinalValidationModel('diibSatirKodu'),
      ]
    }];
  }

  private validationRejim(): IDnValidationModel {
    return {
      formControlName: this.rejimKodName,
      baseValidation: {required: false, disabled: true},
      conditions: [{
        value: item => ['2100', '3151', '5100', '6121', '6321', '6771', '5171'].indexOf(item) > -1,
        validations: [
          new DnDisabledValidationModel('diibSatirKodu'),
          new DnRequiredValidationModel('isleminNiteligi'),
          new DnRequiredValidationModel('esyaninGirisCikisAmaci'),
          ...this.validationRejimMuafiyetKodu(),
          this._teslimSekli.ithalat()
        ]
      }, {
        value: item => ['3141', '3151'].indexOf(item) > -1,
        validations: [
          new DnOptinalValidationModel('mahreceIade'),
        ]
      }, {
        value: item => '4051' === item,
        validations: [
          new DnOptinalValidationModel('isIkincilIslem'),
          this._teslimSekli.ithalat()
        ]
      }, {
        value: item => ['6326', '2600', '2100', '3151', '5100', '6121', '6321', '6771', '5171'].indexOf(item) > -1
          || item.indexOf(58) === 0 || item.indexOf(58) === 2,
        validations: [
          new DnRequiredValidationModel('esyaninGirisCikisAmaci'),
          this._teslimSekli.ithalat()
        ]
      }, {
        value: item => ['5800', '3158', '2600', '6326'].indexOf(item) === -1,
        validations: [
          new DnRequiredValidationModel('teslimSekli'),
          this._teslimSekli.ithalat()
        ]
      }, {
        value: item => ['5800', '3158', '2600', '6326'].indexOf(item) > -1,
        validations: [
          new DnRequiredValidationModel('brutAgirlik'),
          new DnDisabledValidationModel('fatura'),
          new DnDisabledValidationModel('faturaDoviz'),
          new DnOptinalValidationModel('isleminNiteligi'), // ??? zaten serberst
          new DnRequiredValidationModel('istatistikiKiymet'),
          this._teslimSekli.ithalat()
        ]
      }, {
        value: item => item.indexOf(4) === 0,
        validations: [...this.validationIthalat()]
      }, {
        value: item => item.indexOf(7) === 0,
        validations: [...this.validationAntrepo()]
      }, {
        value: item => item.indexOf(1) === 0,
        validations: [...this.validationIhracat()]
      }]
    };
  }

  private validationRejimMuafiyetKodu(): IDnValidationModel[] {
    const val: IDnValidationModel[] = [];
    for (let i = 1; i < 5; i++) {
      val.push({
        formControlName: 'muafiyetKod' + i,
        baseValidation: {required: false, disabled: false},
        conditions: [{
          value: item => ['KITH', 'KIHR'].indexOf(item) > -1,
          validations: [
            new DnDisabledValidationModel('esyaninGirisCikisAmaci'),
            new DnDisabledValidationModel('isleminNiteligi')
          ]
        }, {
          value: item => ['KITH', 'KIHR'].indexOf(item) === -1,
          validations: [
            new DnRequiredValidationModel('esyaninGirisCikisAmaci'),
            new DnRequiredValidationModel('isleminNiteligi')
          ]
        }]
      });
    }
    return val;
  }

  private validationZAlgilamaBirim(): IDnValidationModel[] {
    const val: IDnValidationModel[] = [];
    for (let i = 1; i < 4; i++) {
      val.push({
        formControlName: 'algilamaBirimi' + i,
        baseValidation: {required: false, disabled: false},
        conditions: [{
          value: item => ['KGM', 'C62'].indexOf(item) === -1,
          validations: [
            new DnRequiredValidationModel('algilamaMiktari' + i)
          ]
        }]
      });
    }
    return val;
  }

  /*  private validationRejim(): IDnValidationModel {
      return {
        formControlName: this.rejimKodName,
        baseValidation: {required: false, disabled: false},
        conditions: [{
          value: item => ['D1A', 'D1B', 'D1C', 'D3', 'D3A', 'D3B', 'D5', 'D5A'].indexOf(item.id) !== -1,
          validations: [
            new DnDisabledValidationModel('isleminNiteligi'),
            new DnDisabledValidationModel('esyaninGirisCikisAmaci'),
          ]
        }]
      };
    }*/
}
