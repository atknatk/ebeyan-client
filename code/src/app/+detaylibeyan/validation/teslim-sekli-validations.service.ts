import { Injectable } from '@angular/core';
import {
  DnDisabledValidationModel,
  DnRequiredValidationModel,
  IDnValidationModel
} from '../../shared/utils/validation/dn-validation.model';

@Injectable()
export class DetayliBeyanTeslimSekliValidationService {

  ihracat(): IDnValidationModel {
    return {
      formControlName: 'teslimSekli',
      baseValidation: {required: true, disabled: false},
      conditions: [
        {
          value: item =>  item === 'CFR' || item === 'CPT',
          validations: [
            new DnDisabledValidationModel('sigortaBedeli'),
            new DnDisabledValidationModel('sigortaBedeliDoviz'),
          ]
        },
        // {
        //   value: item => item.id === 'DAF' || item.id === 'EXW' || item.id === 'XXX' || item.id === 'FAS'
        //     || item.id === 'FCA' || item.id === 'FOB',
        //   validations: [
        //     new DnRequiredValidationModel('navlunBedeli'),
        //     new DnRequiredValidationModel('navlunBedeliDoviz'),
        //     new DnRequiredValidationModel('sigortaBedeli'),
        //     new DnRequiredValidationModel('sigortaBedeliDoviz'),
        //   ]
        // },
        {
          value: item => item === 'DDP' || item === 'DDU' || item === 'DEQ' || item === 'DES'
            || item === 'CIF' || item === 'CIP',
          validations: [
            //  new DnDisabledValidationModel('navlunBedeli'),
            //  new DnDisabledValidationModel('navlunBedeliDoviz'),
            new DnDisabledValidationModel('sigortaBedeli'),
            new DnDisabledValidationModel('sigortaBedeliDoviz'),
          ]
        }
      ]
    };
  }

  ithalat(): IDnValidationModel {
    return {
      formControlName: 'teslimSekli',
      baseValidation: {required: true, disabled: false},
      conditions: [
        {
          value: item => item === 'CFR' || item === 'CPT',
          validations: [
            //     new DnDisabledValidationModel('navlunBedeli'),
            //     new DnDisabledValidationModel('navlunBedeliDoviz'),
            new DnRequiredValidationModel('sigortaBedeli'),
            new DnRequiredValidationModel('sigortaBedeliDoviz'),
          ]
        },
        {
          value: item => item === 'DAF' || item === 'EXW' || item === 'XXX' || item === 'FAS'
            || item === 'FCA' || item === 'FOB',
          validations: [
            new DnRequiredValidationModel('navlunBedeli'),
            new DnRequiredValidationModel('navlunBedeliDoviz'),
            new DnRequiredValidationModel('sigortaBedeli'),
            new DnRequiredValidationModel('sigortaBedeliDoviz'),
          ]
        },
        {
          value: item => item === 'DDP' || item === 'DDU' || item === 'DEQ' || item === 'DES'
            || item === 'CIF',
          validations: [
            //   new DnDisabledValidationModel('navlunBedeli'),
            //   new DnDisabledValidationModel('navlunBedeliDoviz'),
            //  new DnDisabledValidationModel('sigortaBedeli'),
            //  new DnDisabledValidationModel('sigortaBedeliDoviz'),
          ]
        },
        {
          value: item => item === 'CIP',
          validations: []
        }
      ]
    };
  }


}
