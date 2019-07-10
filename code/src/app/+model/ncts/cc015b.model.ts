import { isNullOrUndefined } from '@dinazor/core';
/**
 * Created by Cabbar on 7.07.2017.
 */
import { DnXmlElement, DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ABModel } from './cc015b.ab.model';
import { CARTRA100Model } from './cc015b.cartra100.model';
import { CONRESERSModel } from './cc015b.conresers.model';
import { CUSOFFDEPEPTModel } from './cc015b.cusoffdepept.model';
import { CUSOFFDESESTModel } from './cc015b.cusoffdesest.model';
import { CUSOFFTRARNSModel } from './cc015b.cusofftrarns.model';
import { GOOITEGDSModel } from './cc015b.gooitegds.model';
import { GUAGUAModel } from './cc015b.guagua.model';
import { HEAHEAModel } from './cc015b.heahea.model';
import { ITIModel } from './cc015b.iti.model';
import { OBModel } from './cc015b.ob.model';
import { REPREPModel } from './cc015b.reprep.model';
import { SEAINFSLIModel } from './cc015b.seainfsli.model';
import { TRAAUTCONTRAModel } from './cc015b.traautcontra.model';
import { TRACONCE1Model } from './cc015b.traconce1.model';
import { TRACONCO1Model } from './cc015b.traconco1.model';
import { TRACONSEC029Model } from './cc015b.traconsec029.model';
import { TRACORSEC037Model } from './cc015b.tracorsec037.model';
import { TRAPRIPC1Model } from './cc015b.trapripc1.model';
import { BSModel } from './cc015b.bs.model';

export class CC015BModel {

  @DnXmlElementPascal()
  synIdeMES1: string;

  @DnXmlElementPascal()
  synVerNumMES2: string;

  @DnXmlElementPascal()
  mesSenMES3: string;

  @DnXmlElementPascal()
  senIdeCodQuaMES4: string;

  @DnXmlElementPascal()
  mesRecMES6: string;

  @DnXmlElementPascal()
  recIdeCodQuaMES7: string;

  @DnXmlElementPascal()
  datOfPreMES9: string;

  @DnXmlElementPascal()
  timOfPreMES10: string;

  @DnXmlElementPascal()
  intConRefMES11: string;

  @DnXmlElementPascal()
  recRefMES12: string;

  @DnXmlElementPascal()
  recRefQuaMES13: string;

  @DnXmlElementPascal()
  appRefMES14: string;

  @DnXmlElementPascal()
  priMES15: string;

  @DnXmlElementPascal()
  ackReqMES16: string;

  @DnXmlElementPascal()
  comAgrIdMES17: string;

  @DnXmlElementPascal()
  tesIndMES18: string;

  @DnXmlElementPascal()
  mesIdeMES19: string;

  @DnXmlElementPascal()
  mesTypMES20: string;

  @DnXmlElementPascal()
  comAccRefMES21: string;

  @DnXmlElementPascal()
  mesSeqNumMES22: number;

  @DnXmlElementPascal()
  firAndLasTraMES23: string;

  @DnXmlElement('HEAHEA')
  heahea: HEAHEAModel;

  @DnXmlElement('TRAPRIPC1')
  trapripc1: TRAPRIPC1Model;

  @DnXmlElement('TRACONCO1')
  traconco1: TRACONCO1Model;

  @DnXmlElement('TRACONCE1')
  traconce1: TRACONCE1Model;

  @DnXmlElement('TRAAUTCONTRA')
  traautcontra: TRAAUTCONTRAModel;

  @DnXmlElement('CUSOFFDEPEPT')
  cusoffdepept: CUSOFFDEPEPTModel;

  @DnXmlElement('CUSOFFTRARNS')
  cusofftrarns: CUSOFFTRARNSModel[];

  @DnXmlElement('CUSOFFDESEST')
  cusoffdesest: CUSOFFDESESTModel;

  @DnXmlElement('CONRESERS')
  conresers: CONRESERSModel;

  @DnXmlElement('REPREP')
  reprep: REPREPModel;

  @DnXmlElement('SEAINFSLI')
  seainfsli: SEAINFSLIModel;

  @DnXmlElement('GUAGUA')
  guagua: GUAGUAModel[];

  @DnXmlElement('GOOITEGDS')
  gooitegds: GOOITEGDSModel[];

  @DnXmlElement('ITI')
  iti: ITIModel[];

  @DnXmlElement('CARTRA100')
  cartra100: CARTRA100Model;

  @DnXmlElement('TRACORSEC037')
  tracorsec037: TRACORSEC037Model;

  @DnXmlElement('TRACONSEC029')
  traconsec029: TRACONSEC029Model;

  @DnXmlElement('OB')
  ob: OBModel;

  @DnXmlElement('AB')
  ab: ABModel;

  @DnXmlElement('BS')
  bs: BSModel;


  constructor(options: {} = {}) {
    this.synIdeMES1 = options['synIdeMES1'];
    this.synVerNumMES2 = options['synVerNumMES2'];
    this.mesSenMES3 = options['mesSenMES3'];
    this.senIdeCodQuaMES4 = options['senIdeCodQuaMES4'];
    this.mesRecMES6 = options['mesRecMES6'];
    this.recIdeCodQuaMES7 = options['recIdeCodQuaMES7'];
    this.datOfPreMES9 = options['datOfPreMES9'];
    this.timOfPreMES10 = options['timOfPreMES10'];
    this.intConRefMES11 = options['intConRefMES11'];
    this.recRefMES12 = options['recRefMES12'];
    this.recRefQuaMES13 = options['recRefQuaMES13'];
    this.appRefMES14 = options['appRefMES14'];
    this.priMES15 = options['priMES15'];
    this.ackReqMES16 = options['ackReqMES16'];
    this.comAgrIdMES17 = options['comAgrIdMES17'];
    this.tesIndMES18 = options['tesIndMES18'];
    this.mesIdeMES19 = options['mesIdeMES19'];
    this.mesTypMES20 = options['mesTypMES20'];
    this.comAccRefMES21 = options['comAccRefMES21'];
    this.mesSeqNumMES22 = options['mesSeqNumMES22'];
    this.firAndLasTraMES23 = options['firAndLasTraMES23'];
    this.heahea = isNullOrUndefined(options['heahea']) ? undefined : new HEAHEAModel(options['heahea']);
    this.trapripc1 = isNullOrUndefined(options['trapripc1']) ? undefined : new TRAPRIPC1Model(options['trapripc1']);
    this.traconco1 = isNullOrUndefined(options['traconco1']) ? undefined : new TRACONCO1Model(options['traconco1']);
    this.traconce1 = isNullOrUndefined(options['traconce1']) ? undefined : new TRACONCE1Model(options['traconce1']);
    this.traautcontra = isNullOrUndefined(options['traautcontra']) ? undefined : new TRAAUTCONTRAModel(options['traautcontra']);
    this.cusoffdepept = isNullOrUndefined(options['cusoffdepept']) ? undefined : new CUSOFFDEPEPTModel(options['cusoffdepept']);

    if (options['cusofftrarns']) {
      this.cusofftrarns = Array<CUSOFFTRARNSModel>();
      options['cusofftrarns'].forEach(model => {
        this.cusofftrarns.push(new CUSOFFTRARNSModel(model));
      });
    }

    this.cusoffdesest = isNullOrUndefined(options['cusoffdesest']) ? undefined : new CUSOFFDESESTModel(options['cusoffdesest']);
    this.conresers = isNullOrUndefined(options['conresers']) ? undefined : new CONRESERSModel(options['conresers']);
    this.reprep = isNullOrUndefined(options['reprep']) ? undefined : new REPREPModel(options['reprep']);
    this.seainfsli = isNullOrUndefined(options['seainfsli']) ? undefined : new SEAINFSLIModel(options['seainfsli']);

    if (options['guagua']) {
      this.guagua = Array<GUAGUAModel>();
      options['guagua'].forEach(model => {
        this.guagua.push(new GUAGUAModel(model));
      });
    }

    if (options['gooitegds']) {
      this.gooitegds = Array<GOOITEGDSModel>();
      options['gooitegds'].forEach(model => {
        this.gooitegds.push(new GOOITEGDSModel(model));
      });
    }

    if (options['iti']) {
      this.iti = Array<ITIModel>();
      options['iti'].forEach(model => {
        this.iti.push(new ITIModel(model));
      });
    }

    this.cartra100 = isNullOrUndefined(options['cartra100']) ? undefined : new CARTRA100Model(options['cartra100']);
    this.tracorsec037 = isNullOrUndefined(options['tracorsec037']) ? undefined : new TRACORSEC037Model(options['tracorsec037']);
    this.traconsec029 = isNullOrUndefined(options['traconsec029']) ? undefined : new TRACONSEC029Model(options['traconsec029']);
    this.ob = isNullOrUndefined(options['ob']) ? undefined : new OBModel(options['ob']);
    this.ab = isNullOrUndefined(options['ab']) ? undefined : new ABModel(options['ab']);
    this.bs = isNullOrUndefined(options['bs']) ? undefined : new BSModel(options['bs']);

  }
}
