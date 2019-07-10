

import { isNullOrUndefined, isString } from '@dinazor/core';
import { isNumber } from 'util';

export interface IGtbModel<T> {
  creatorModel(obj: any): T;
}


export class ModelBase {
  equalizer(options: any, exluded?: string[]) {
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        let val = options[prop];
        if ((isString(val) || isNumber(val)) && !this.isExcluded(exluded, prop)) {
          this[prop] = val;
        }
      }
    }
  }

  private isExcluded(exluded: string[], prop: string): boolean {
    if (isNullOrUndefined(exluded)) {
      return false;
    }
    if (exluded.indexOf(prop) > -1) {
      return true;
    }
    return false;
  }
}

