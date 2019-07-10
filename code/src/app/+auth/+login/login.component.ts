import { Component } from '@angular/core';
import { DnHttpService, DnStorageService } from '@dinazor/core';
import { DnLoginConfigService } from '@dinazor/core/release/views/auth/login/login-config.service';
import { gtbConst } from '../../gtb/gtb-const';


@Component({
  template: '<dn-login></dn-login>'
})
export class LoginComponent {


  constructor(private loginService: DnLoginConfigService,
              private _http: DnHttpService<any>,
              private _storage: DnStorageService) {
    this.loginService.loginConfig.afterNavigateEvent = (res => {
      this.setLocalStorage(res);
      const cacheUrls = ['ulke', 'doviz', 'islemniteligi', 'limankod', 'gumrukidaresi', 'bankakod', 'tasimaaraci',
        'teslimsekli', 'rejimkod', 'olcubirim', 'muafiyetkod', 'yesno', 'odemesekli', 'kdv', 'gtip',
        'antrepokod', 'tasimasekli', 'basitlestirilmisusulkod', 'alicisaticiiliskisi', 'esyaozellik', 'esyacinsi'
        , 'kullanilmisesya', 'esyaningiriscikisamaci', 'uluslararasianlasma', 'istenendokuman', 'vergiodemesekli',
        'ozetbeyanacmasekli', 'ambar', 'tamamlayicibilgikod', 'teminatsekli', 'tamamlayicibilgikod', 'havalimani'];
      cacheUrls.forEach(item => {
        _http.addCachableUrl(item);
        _http.refreshCache(item);
      });
    });
  }


  private setLocalStorage(data: any) {
    this._http.get('Gtbuser/' + data.id + '/User').subscribe(res => {
      if (res.isSuccess) {
        this._storage.setItem(gtbConst.gtbUserKey, res.data);
      }
    });

    this._http.get('FaturaKullanici/Current').subscribe(res => {
      if (res.isSuccess) {
        this._storage.setItem(gtbConst.gtbFaturaUserKey, res.data);
      }
    });
  }

}
