import { Injectable } from '@angular/core';
import { DnHttpService, DnResultDataBase } from '@dinazor/core';
import { Observable } from 'rxjs/Observable';
import { IOzetbeyanService } from '../gtb/shared/ozetbeyan/ozetbeyan-base.service';

@Injectable()
export class OzetbeyanService implements IOzetbeyanService {

  constructor(private _http: DnHttpService<any>) {
  }

  deleteEsyaSatir(idEsyaSatir: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('EsyaSatir', idEsyaSatir);
  }

  deleteEsyaninUgradigiUlkeler(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('EsyaninUgradigiUlkeler', idEsyaninUgradigiUlkeler);
  }

  deleteIhracatIlgiliBeyan(idIhracatIlgiliBeyan: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('IhracatIlgiliBeyan', idIhracatIlgiliBeyan);
  }

  deleteTasimaSatir(idTasimaSatir: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('TasimaSatir', idTasimaSatir);
  }

  deleteTasimaSenet(idTasimaSenet: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('tasimasenet', idTasimaSenet);
  }

  deleteVarisCikisLimani(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return undefined;
  }

  getOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('ozetbeyan/' + idOzetbeyan, loadingContext);
  }

  getTasimaSenet(idTasimaSenet: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`tasimasenet/${idTasimaSenet}`, loadingContext);
  }

  getTasimaSenetFromOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`ozetbeyan/${idOzetbeyan}/tasimasenet`, loadingContext);
  }

  saveOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(ozetbeyan, 'ozetbeyan', loadingContext);
  }

  saveTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(tasimaSenet, 'tasimasenet', loadingContext);
  }

  temporaryTransaction(loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('TemporaryTransaction/OzetBeyan', loadingContext);
  }

  updateOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(ozetbeyan, 'ozetbeyan', loadingContext);
  }

  updateTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(tasimaSenet, 'tasimasenet', loadingContext);
  }

}
