import { Injectable } from '@angular/core';
import { DnHttpService, DnResultDataBase } from '@dinazor/core';
import { Observable } from 'rxjs/Observable';
import { IOzetbeyanService } from '../gtb/shared/ozetbeyan/ozetbeyan-base.service';

@Injectable()
export class CikisbildirimiService implements IOzetbeyanService {
  constructor(private _http: DnHttpService<any>) {
  }

  deleteEsyaSatir(idEsyaSatir: any): Observable<DnResultDataBase<any[]>> {
    return;
  }

  deleteEsyaninUgradigiUlkeler(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return;
  }

  deleteIhracatIlgiliBeyan(idIhracatIlgiliBeyan: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('CikisBildirimiIhracatIlgiliBeyanList', idIhracatIlgiliBeyan);
  }

  deleteTasimaSatir(idTasimaSatir: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('CikisBildirimiTasimaSatir', idTasimaSatir);
  }

  deleteTasimaSenet(idTasimaSenet: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('CikisBildirimiTasimaSenet', idTasimaSenet);
  }

  deleteVarisCikisLimani(idEsyaninUgradigiUlkeler: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('TasitinUgradigiUlkeler', idEsyaninUgradigiUlkeler);
  }

  getOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('CikisBildirimi/' + idOzetbeyan, loadingContext);
  }

  getTasimaSenet(idTasimaSenet: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`CikisBildirimiTasimaSenet/${idTasimaSenet}`, loadingContext);
  }

  getTasimaSenetFromOzetbeyan(idOzetbeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`CikisBildirimi/${idOzetbeyan}/tasimasenet`, loadingContext);
  }

  saveOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(ozetbeyan, 'CikisBildirimi', loadingContext);
  }

  saveTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(tasimaSenet, 'CikisBildirimiTasimaSenet', loadingContext);
  }

  temporaryTransaction(loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('TemporaryTransaction/CikisBildirimi', loadingContext);
  }

  updateOzetbeyan(ozetbeyan: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(ozetbeyan, 'CikisBildirimi', loadingContext);
  }

  updateTasimaSenet(tasimaSenet: any, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(tasimaSenet, 'CikisBildirimiTasimaSenet', loadingContext);
  }

}
