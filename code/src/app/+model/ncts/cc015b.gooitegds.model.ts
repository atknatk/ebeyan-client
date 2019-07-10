/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElement, DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';
import { PREADMREFAR2Model } from './cc015b.gooitegds.preadmrefar2.model';
import { PRODOCDC2Model } from './cc015b.gooitegds.prodocdc2.model';
import { SPEMENMT2Model } from './cc015b.gooitegds.spemenmt2.model';
import { TRACONCO2Model } from './cc015b.gooitegds.traconco2.model';
import { isNullOrUndefined } from '@dinazor/core';
import { TRACONCE2Model } from './cc015b.gooitegds.traconce2.model';
import { CONNR2Model } from './cc015b.gooitegds.connr2.model';
import { PACGS2Model } from './cc015b.gooitegds.pacgs2.model';
import { SGICODSD2Model } from './cc015b.gooitegds.sgicodsd2.model';
import { TRACORSECGOO021Model } from './cc015b.gooitegds.tracorsecgoo021.model';
import { TRACONSECGOO013Model } from './cc015b.gooitegds.traconsecgoo013.model';

export class GOOITEGDSModel extends ModelBase {

  @DnXmlElementPascal()
  iteNumGDS7: number;

  @DnXmlElementPascal()
  comCodTarCodGDS10: string;

  @DnXmlElementPascal()
  decTypGDS15: string;

  @DnXmlElementPascal()
  gooDesGDS23: string;

  @DnXmlElementPascal()
  gooDesGDS23LNG: string;

  @DnXmlElementPascal()
  groMasGDS46: number;

  @DnXmlElementPascal()
  netMasGDS48: number;

  @DnXmlElementPascal()
  couOfDisGDS58: string;

  @DnXmlElementPascal()
  couOfDesGDS59: string;

  @DnXmlElementPascal()
  metOfPayGDI12: string;

  @DnXmlElementPascal()
  comRefNumGIM1: string;

  @DnXmlElementPascal()
  uNDanGooCodGDI1: string;

  @DnXmlElementPascal()
  ihrBeyanNo: string;

  @DnXmlElementPascal()
  ihrBeyanTip: string;

  @DnXmlElementPascal()
  ihrBeyanParcali: string;

  @DnXmlElement('PREADMREFAR2')
  preadmrefar2: PREADMREFAR2Model[];

  @DnXmlElement('PRODOCDC2')
  prodocdc2: PRODOCDC2Model[];

  @DnXmlElement('SPEMENMT2')
  spemenmt2: SPEMENMT2Model[];

  @DnXmlElement('TRACONCO2')
  traconco2: TRACONCO2Model;

  @DnXmlElement('TRACONCE2')
  traconce2: TRACONCE2Model;

  @DnXmlElement('CONNR2')
  connr2: CONNR2Model[];

  @DnXmlElement('PACGS2')
  pacgs2: PACGS2Model[];

  @DnXmlElement('SGICODSD2')
  sgicodsd2: SGICODSD2Model[];

  @DnXmlElement('TRACORSECGOO021')
  tracorsecgoo021: TRACORSECGOO021Model;

  @DnXmlElement('TRACONSECGOO013')
  traconsecgoo013: TRACONSECGOO013Model;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);

    if (options['preadmrefar2']) {
      this.preadmrefar2 = Array<PREADMREFAR2Model>();
      options['preadmrefar2'].forEach(model => {
        this.preadmrefar2.push(new PREADMREFAR2Model(model));
      });
    }

    if (options['prodocdc2']) {
      this.prodocdc2 = Array<PRODOCDC2Model>();
      options['prodocdc2'].forEach(model => {
        this.prodocdc2.push(new PRODOCDC2Model(model));
      });
    }

    if (options['spemenmt2']) {
      this.spemenmt2 = Array<SPEMENMT2Model>();
      options['spemenmt2'].forEach(model => {
        this.spemenmt2.push(new SPEMENMT2Model(model));
      });
    }

    this.traconco2 = isNullOrUndefined(options['traconco2']) ? undefined : new TRACONCO2Model(options['traconco2']);
    this.traconce2 = isNullOrUndefined(options['traconce2']) ? undefined : new TRACONCE2Model(options['traconce2']);

    if (options['connr2']) {
      this.connr2 = Array<CONNR2Model>();
      options['connr2'].forEach(model => {
        this.connr2.push(new CONNR2Model(model));
      });
    }

    if (options['pacgs2']) {
      this.pacgs2 = Array<PACGS2Model>();
      options['pacgs2'].forEach(model => {
        this.pacgs2.push(new PACGS2Model(model));
      });
    }

    if (options['sgicodsd2']) {
      this.sgicodsd2 = Array<SGICODSD2Model>();
      options['sgicodsd2'].forEach(model => {
        this.sgicodsd2.push(new SGICODSD2Model(model));
      });
    }

    this.tracorsecgoo021 = isNullOrUndefined(options['tracorsecgoo021']) ? undefined : new TRACORSECGOO021Model(options['tracorsecgoo021']);
    this.traconsecgoo013 = isNullOrUndefined(options['traconsecgoo013']) ? undefined : new TRACONSECGOO013Model(options['traconsecgoo013']);


  }
}
