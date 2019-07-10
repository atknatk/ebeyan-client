import { isNullOrUndefined } from '@dinazor/core';

export interface IBaseValidationModel {
  required?: boolean;
  disabled?: boolean;
}

export interface IDnValidationModel {
  formControlName: string;
  baseValidation: IBaseValidationModel;
  conditions?: IDnValidationConditonModel[];
}

export interface IDnValidationConditonModel {
  value: (item: any) => boolean;
  validations: IDnValidationModel[];
}

export class DnValidationModel implements IDnValidationModel {
  formControlName: string;
  baseValidation: IBaseValidationModel;
  conditions?: IDnValidationConditonModel[];

  constructor(options?: IDnValidationModel) {
    const opt = options || {} as IDnValidationModel;
    this.formControlName = opt.formControlName;
    this.baseValidation = opt.baseValidation;
    this.conditions = isNullOrUndefined(opt.conditions) ? Array<IDnValidationConditonModel>() : opt.conditions;
  }
}

export class DnRequiredValidationModel extends DnValidationModel implements IDnValidationModel {

  constructor(formControlName: string) {
    super({
      formControlName: formControlName,
      baseValidation: {
        required: true,
        disabled: false
      },
      conditions: Array<IDnValidationConditonModel>()
    });
  }
}

export class DnDisabledValidationModel extends DnValidationModel implements IDnValidationModel {

  constructor(formControlName: string) {
    super({
      formControlName: formControlName,
      baseValidation: {
        required: false,
        disabled: true
      },
      conditions: Array<IDnValidationConditonModel>()
    });
  }
}

export class DnOptinalValidationModel extends DnValidationModel implements IDnValidationModel {

  constructor(formControlName: string) {
    super({
      formControlName: formControlName,
      baseValidation: {
        required: false,
        disabled: false
      },
      conditions: Array<IDnValidationConditonModel>()
    });
  }
}
