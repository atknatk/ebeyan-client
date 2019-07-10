import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { DnLoggerService, isNullOrUndefined, isNullOrUndefinedOrEmpty } from '@dinazor/core';
import { IDnValidationConditonModel, IDnValidationModel } from './dn-validation.model';

@Injectable()
export class DnValidation {

  constructor(private _log: DnLoggerService) {
  }

  initializeValidation(form: FormGroup, validatons: IDnValidationModel[]) {
    this._log.debug('initializeValidation yükleniyor...', validatons);
    validatons.forEach(validaton => {
      // Ana Modelin Validation'ı
      this._log.debug('initializeValidation koşul ekleniyor', validaton);
      this.validationSet(validaton, form);
      // const value = form.get(validaton.formControlName).value;
      // if (isNullOrUndefined(value)) return;
      form.get(validaton.formControlName).valueChanges.subscribe(value => {
        this._log.debug(`initializeValidation değer değişti ${validaton.formControlName}`, value);
        this.clearConditionValidations(validaton, form);
        if (isNullOrUndefinedOrEmpty(value)) {
          return;
        }
        const condition = validaton.conditions.filter((_cndt: IDnValidationConditonModel) => _cndt.value(value));
        if (condition.length > 0) {
          condition.forEach(_condition => {
            this.initializeValidation(form, _condition.validations);
          });
        } else {
          this.clearConditionValidations(validaton, form);
        }
      });
    });
    form.updateValueAndValidity();
  }

  private clearConditionValidations(validation: IDnValidationModel, form: FormGroup) {
    validation.conditions.forEach(condition => {
      //  this.clearConditionValidations(condition.validations, form);
      condition.validations.forEach(_validation => {
        if (isNullOrUndefined(form.get(_validation.formControlName))) {
          this._log.debug(`formControlName null  ${_validation.formControlName}`, _validation);
        }
        if (_validation.baseValidation.required) {
          form.get(_validation.formControlName).clearValidators();
          form.get(_validation.formControlName).patchValue(null, {emitEvent: false});
        } else if (_validation.baseValidation.disabled) {
          form.get(_validation.formControlName).enable();
        }
        form.get(_validation.formControlName).updateValueAndValidity();
      });
    });

  }

  private hasRequiredField(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({}as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }

    if (abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName]) {
          if (this.hasRequiredField(abstractControl['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private validationSet(validation: IDnValidationModel, form: FormGroup) {
    this._log.debug(`DnValidation validationSet değer uygulanıyor ${validation.formControlName}`, form);
    const formControl: AbstractControl = form.get(validation.formControlName);
    if (validation.baseValidation.required === true) {
      if (!this.hasRequiredField(formControl)) {
        formControl.setValidators(Validators.required);
      }
    } else if (validation.baseValidation.disabled === true) {
      formControl.patchValue(null, {emitEvent: false});
      formControl.disable({onlySelf: true, emitEvent: false});
    } else {
      formControl.clearValidators();
    }
    formControl.updateValueAndValidity();
  }

}
