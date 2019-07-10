/**
 * Created by cabbar on 24.05.2017.
 */

import {DnQuestionRequiredValidator, isNullOrUndefinedOrEmpty} from '@dinazor/core';
import {config} from '@dinazor/core/release/dinazor.config';

export const gtbConst: any = {
  displaySelectFirma: res => {
    if (isNullOrUndefinedOrEmpty(res.entity['vergiNo'])) {
      return res.entity['adiUnvani'];
    }
    return res.entity['vergiNo'] + ' - ' + res.entity['adiUnvani'];
  },
  selectedTextFirma: res => {
    if (isNullOrUndefinedOrEmpty(res.entity['vergiNo'])) {
      return res.entity['adiUnvani'];
    }
    return res.entity['vergiNo'];
  },
  selectedTextVarYok: res => {
    return res.entity['otherName'];
  },
  selectedTextVY: res => {
    if (res.entity['otherName'].charAt(0) === 'Y') {
      return 'S';
    } else {
      return res.entity['otherName'].charAt(0);
    }
  },
  displayGtbUser: res => {
    return res.entity['name'] + ' - ' + res.entity['surname'];
  },
  displaySelect: res => res.entity.id + ' - ' + res.name,
  displaySelectUser: res => res.entity['name'] + ' ' + res.entity['surname'],
  selectedText: res => res.id,
  selectDefault: res => res.name,
  dnRequire: new DnQuestionRequiredValidator(),
  gtbUserKey: 'gtbUserKey',
  gtbFaturaUserKey: 'gtbFaturaUserKey',
  config: config,

  // Servis Adresleri
  urls: {
    nctsUlkeKod: 'NctsUlkeKod',
    dil: 'Dil',
    nctsTasimaSekli: 'NctsTasimaSekli'
  }
};
