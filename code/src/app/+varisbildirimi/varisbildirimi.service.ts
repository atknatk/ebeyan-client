import { Injectable } from '@angular/core';
import { DnHttpService, DnResultDataBase } from '@dinazor/core';
import { Observable } from 'rxjs/Observable';
import { IOzetbeyanService } from '../gtb/shared/ozetbeyan/ozetbeyan-base.service';

@Injectable()
export class VarisbildirimiService implements IOzetbeyanService {
  constructor(private _http: DnHttpService<any>) {
  }

  deleteEsyaSatir(idEsyaSatir: any): Observable<DnResultDataBase<any[]>> {
    return;
  }

  deleteEsyaninUgradigiUlkeler(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return;
  }

  deleteIhracatIlgiliBeyan(idIhracatIlgiliBeyan: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('varisBildirimiIhracatIlgiliBeyanList', idIhracatIlgiliBeyan);
  }

  deleteTasimaSatir(idTasimaSatir: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('VarisBildirimiTasimaSatir', idTasimaSatir);
  }

  deleteTasimaSenet(idTasimaSenet: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('VarisBildirimiTasimaSenet', idTasimaSenet);
  }

  deleteVarisCikisLimani(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('TasitinUgradigiUlkeler', idEsyaninUgradigiUlkeler);
  }

  getOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('VarisBildirimi/' + idOzetbeyan, loadingContext);
  }

  getTasimaSenet(idTasimaSenet: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`VarisBildirimiTasimaSenet/${idTasimaSenet}`, loadingContext);
  }

  getTasimaSenetFromOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`VarisBildirimi/${idOzetbeyan}/tasimasenet`, loadingContext);
  }

  saveOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(ozetbeyan, 'VarisBildirimi', loadingContext);
  }

  saveTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(tasimaSenet, 'VarisBildirimiTasimaSenet', loadingContext);
  }

  temporaryTransaction(loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('TemporaryTransaction/VarisBildirimi', loadingContext);
  }

  updateOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(ozetbeyan, 'VarisBildirimi', loadingContext);
  }

  updateTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(tasimaSenet, 'VarisBildirimiTasimaSenet', loadingContext);
  }

}
