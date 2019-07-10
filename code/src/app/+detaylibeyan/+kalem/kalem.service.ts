/**
 * Created by cabbar on 04.05.2017.
 */
import { Injectable } from '@angular/core';
import { DnHttpService, DnResultDataBase } from '@dinazor/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class KalemService {

  idKalem: number = 0;

  constructor(private _http: DnHttpService<any>) {
  }

  deleteKalem(idDetayliBeyanKalem: number, loadingContext: any) {
    return this._http.delete('detaylibeyankalem', idDetayliBeyanKalem, loadingContext);
  }

  deleteOdemeSekil(idOdemeSekil: any): Observable<DnResultDataBase<any[]>> {
    return this._http.delete('DetayliBeyanKalemOdemeSekli', idOdemeSekil);
  }

  getKalemById(idKalem: number, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`detaylibeyankalemV2/${idKalem}`, {
      useApi: true,
      loadingBase: loadingContext
    });
  }

  getKalemFromDetayliBeyan(idDetayliBeyan: number, loadingContext: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`apiV2/Detaylibeyan/${idDetayliBeyan}/Kalem`, {
      useApi: false,
      loadingBase: loadingContext
    });
  }

  getRejimBsKod(idDetayliBeyan: number, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`DetayliBeyan/${idDetayliBeyan}/RejimKodBs`, loadingContext);
  }

  getSimpleDetaylibeyan(idDetaylibeyan, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get('detaylibeyan/simple/' + idDetaylibeyan, loadingContext);
  }

  getSimpleDetaylibeyanKalemList(idDetaylibeyan, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.get(`detaylibeyan/${idDetaylibeyan}/kalem/simple`);
  }

  saveKalem(data: any, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.post(data, 'detaylibeyankalemV2', loadingContext);
  }

  setIdKalem(idKalem: number) {
    this.idKalem = idKalem;
  }

  updateKalem(data: any, loadingContext?: any): Observable<DnResultDataBase<any[]>> {
    return this._http.put(data, 'detaylibeyankalemV2', loadingContext);
  }
}
