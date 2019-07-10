import { DnResultDataBase } from '@dinazor/core';
import { Observable } from 'rxjs/Observable';

export interface IOzetbeyanService {

  deleteEsyaSatir(idEsyaSatir: any): Observable<DnResultDataBase<any[]>>;

  deleteEsyaninUgradigiUlkeler(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>>;

  deleteVarisCikisLimani(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>>;

  deleteIhracatIlgiliBeyan(idIhracatIlgiliBeyan: any): Observable<DnResultDataBase<any[]>>;

  deleteTasimaSatir(idTasimaSatir: any): Observable<DnResultDataBase<any[]>>;

  deleteTasimaSenet(idTasimaSenet: any): Observable<DnResultDataBase<any[]>>;

  getOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  getTasimaSenet(idTasimaSenet: number, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  getTasimaSenetFromOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  saveOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  saveTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  temporaryTransaction(loadingContext: any): Observable<DnResultDataBase<any[]>>;

  updateOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>>;

  updateTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>>;

}
