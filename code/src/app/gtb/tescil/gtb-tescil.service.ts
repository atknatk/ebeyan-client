import { Injectable } from '@angular/core';
import {
  AuthUser,
  deepCopy,
  DnHttpService,
  DnLoggerService,
  DnNotificationService,
  DnStorageService,
  isNullOrUndefined
} from '@dinazor/core';
import { config } from '@dinazor/core/release/dinazor.config';
import { GtbUserModel } from 'app/+model/gtbuser/gtb-user.model';
import { Observable } from 'rxjs/Observable';
import { CikisbildirimiModel } from '../../+model/cikisbildirimi/cikisbildirimi.model';
import { DetayliBeyanModel } from '../../+model/detaylibeyan/detaylibeyan.model';
import { OzetBeyanModel } from '../../+model/ozetbeyan/ozetbeyan.model';
import { VarisbildirimiModel } from '../../+model/varisbildirimi/varisbildirimi.model';
import { DnXmlSerialize } from '../../shared/utils/dn-serialize';
import { gtbConst } from '../gtb-const';

/**
 * Created by cabbar on 31.05.2017.
 */


@Injectable()
export class TescilService {

  private gtbUser: GtbUserModel;
  private loadingContext: any;

  constructor(private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private dnStorageService: DnStorageService,
              private log: DnLoggerService) {
    this.gtbUser = this.dnStorageService.getItem(gtbConst.gtbUserKey);
  }

  birlikOnay(dtby) {
    this.loadingContext.context.loading = true;
    this.loadingContext.context.loadingText = 'Kripto verisi hazırlanıyor.';
    this.dnHttp.get('DetayliBeyan/' + dtby.id + '/Kripto').subscribe(res => {
      if (res.isSuccess)
        this.notificationService.showSuccess('Birlik Onayı başarılı bir şekilde gönderildi.');
      else
        this.notificationService.showDinazorResultMessage(res);
      this.loadingContext.context.loading = false;
    });
  }

  kontrolDetayliBeyan(idDetayliBeyan: number, loading: any): void {

    this.loadingContext.context.loading = true;
    this.dnHttp.get('detaylibeyan/' + idDetayliBeyan + '/KontrolProduction').subscribe(res => {
      if (res.isSuccess)
        this.notificationService.showSuccess('Detayli Beyan başarılı bir şekilde gümrük kontrol servisinin kuyruğuna eklenmiştir.');
      else
        this.notificationService.showDinazorResultMessage(res);
      this.loadingContext.context.loading = false;
    });
  }

  setLoadingContext(context: any) {
    this.loadingContext = context;
  }

  soruDetayliBeyan(dtby: any): void {
    if (!this.checkRequirment(dtby, true)) return;
    //   this.loadingContext = loading;
    this.dnHttp.get('detaylibeyanv2/' + dtby.id + '/detaylibeyansoru').subscribe(res => {
      if (res.isSuccess) {
        let soruArr: any[] = res.data;
        if (soruArr && soruArr.length > 0) {
          this.initQuestion(soruArr, dtby);
        } else {
          this.eimzaSifreQuestion(this.tescilDetayliBeyan.bind(this), dtby);
        }

      }
    });
  }

  tescilCikisBildirimi(data?: any): void {
    this.eimzaSifreQuestion(this.tescilBeyanProcess.bind(this), data, 'Cikisbildirimi/', 'Cikisbildirimi/TescilProduction', false);
  }

  tescilOzetbeyan(data?: any): void {
    this.eimzaSifreQuestion(this.tescilBeyanProcess.bind(this), data, 'OzetBeyan/', 'OzetBeyan/TescilProduction', false);
  }

  tescilVarisBildirimi(data?: any): void {
    this.eimzaSifreQuestion(this.tescilBeyanProcess.bind(this), data, 'Varisbildirimi/', 'Varisbildirimi/TescilProduction', false);
  }

  private answerQuestion(question: any, cbArray: any[], dtby: any) {
    if (question != null && question.kod == '7780' && question.cevap.id == 1) {
      this.notificationService.showWarning('Beyanı düzeltmeniz için tescil işlemi işlemi yapılmamıştır.', 'Soru Kayıt İşlemi');
    } else {
      this.dnHttp.put(question, 'detayliBeyanSoru').subscribe(res => {
        if (res.isSuccess) {
          this.recursiveQuestion(cbArray, dtby);
        } else {
          this.notificationService.showError('Soruların cevabını kaydederken hata ile karşılaştık.', 'Soru Kayıt İşlemi');
        }
      });
    }
  }

  private checkRequirment(tescilDataParam: any, isKontrolRequired: boolean): boolean {
    if (isNullOrUndefined(tescilDataParam)) {
      this.notificationService.showWarning('Önce tescil etmek istediğiniz veriyi tablodan seçiniz', 'Veri Seç!');
      return false;
    }

    if (isNullOrUndefined(this.gtbUser)) {
      this.notificationService.showWarning('GTB Kullanıcınız oluşturlmamaıştır', 'Kullanıcı Hatası!');
      return false;
    }

    if (isNullOrUndefined(this.gtbUser.bilgeKullaniciAdi)) {
      this.notificationService.showWarning('GTB Kullanıcınızda bilge kullanıcı adı tanımlanmamıştır.', 'Kullanıcı Hatası!');
      return false;
    }

    if (isNullOrUndefined(this.gtbUser.bilgeSifre)) {
      this.notificationService.showWarning('GTB Kullanıcınızda bilge şifreniz tanımlanmamıştır.', 'Kullanıcı Hatası!');
      return false;
    }

    if (isNullOrUndefined(this.gtbUser.servisKullaniciAdi)) {
      this.notificationService.showWarning('GTB Kullanıcınızda servis kullanıcı adı tanımlanmamıştır.', 'Kullanıcı Hatası!');
      return false;
    }

    if (isNullOrUndefined(this.gtbUser.servisSifre)) {
      this.notificationService.showWarning('GTB Kullanıcınızda servis şifresi tanımlanmamıştır.', 'Kullanıcı Hatası!');
      return false;
    }

    /*    if (isKontrolRequired) {
          if (isNullOrUndefined(tescilDataParam.detayliBeyanSonuc)
            || isNullOrUndefined(tescilDataParam.detayliBeyanSonuc.kontrolSonuc)
            || tescilDataParam.detayliBeyanSonuc.kontrolSonuc.id != 'Success') {
            this.notificationService.showWarning('Önce başarılı bir şekilde beyanı kontrol etmelisiniz!');
            return false;
          }
        }*/
    return true;
  }

  private eimzaSifreQuestion(cb: (model, pin, param1?, param2?, isKontrolRequired?: boolean) => void,
                             model: any,
                             param1?: any,
                             param2?: any,
                             isKontrolRequired?: boolean) {
    this.notificationService.smartMessageBox({
      title: 'Pin',
      content: 'Lütfen E-İmza şifrenizi giriniz',
      buttons: '[İptal][Gönder]',
      input: 'password',
      placeholder: 'E-İmza Şifre'
    }, (buttonPress, value) => {
      if (buttonPress == 'Gönder') {
        if (isNullOrUndefined(value)) {
          this.notificationService.showWarning('Şifre boş olamaz', 'Şifre');
          this.eimzaSifreQuestion(cb, model, param1, param2);
        } else {
          cb(model, value, param1, param2, isKontrolRequired);
        }
      } else {
        this.notificationService.showWarning('İsteğiniz üzerine tescil işlemi iptal edilmiştir.', 'İptal');
      }
    });
  }

  private getBeyanXml(data: any, tasimaSenetList: any, param1: string): string {
    let model;
    if (param1.toLowerCase().indexOf('ozetbeyan') > -1) {
      data.tasimaSenetList = tasimaSenetList;
      model = new OzetBeyanModel({
        refId: data.refId,
        ozetBeyan: data,
        kullaniciAdi: data.kullaniciKodu,
        sifre: this.gtbUser.bilgeSifre
      });
      model.ozetBeyan.xmlRefId = data.refId;
    } else if (param1.toLowerCase().indexOf('varisbildirimi') > -1) {
      data.beyanTuru = {id: 'VARONC'};
      data.varisBildirimiTasimaSenetList = tasimaSenetList;
      model = new VarisbildirimiModel({
        refId: data.refId,
        varisbildirimi: data,
        kullaniciAdi: data.kullaniciKodu,
        sifre: this.gtbUser.bilgeSifre
      });
      model.varisbildirimi.xmlRefId = data.refId;
    } else if (param1.toLowerCase().indexOf('cikisbildirimi') > -1) {
      data.beyanTuru = {id: 'CIKONC'};
      data.cikisBildirimiTasimaSenetList = tasimaSenetList;
      model = new CikisbildirimiModel({
        refId: data.refId,
        cikisbildirimi: data,
        kullaniciAdi: data.kullaniciKodu,
        sifre: this.gtbUser.bilgeSifre
      });
      model.cikisbildirimi.xmlRefId = data.refId;
    }

    let xml: string = this.getXml(DnXmlSerialize.serialize(model));
    return xml;
  }

  private getXml(tescilXml) {
    return `<?xml version='1.0' encoding='utf-8'?>
    <Gelen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">` +
      tescilXml
      + `</Gelen>`;
  }

  private initQuestion(cbArray: any[], dtby: any) {
    let firstCb = deepCopy(cbArray[0]);
    cbArray.shift();
    this.question(firstCb, cbArray, dtby);
  }

  private isSuccessSigned(resSigned): boolean {
    if (resSigned.status == 1) {
      this.loadingContext.context.loading = false;
      this.notificationService.showError('E-İmza kartı bulunumadı!.');
      return false;
    } else if (resSigned.status == 2) {
      this.loadingContext.context.loading = false;
      this.notificationService.showError('E-İmza şifresi hatalı!.');
      return false;
    } else if (resSigned.status == 3) {
      this.loadingContext.context.loading = false;
      this.notificationService.showError('E-İmza kilitlidir!.');
      return false;
    } else if (resSigned.status == -1) {
      this.loadingContext.context.loading = false;
      this.notificationService.showError('E-İmza şifrelemede hata oluştu.');
      return false;
    }
    if (isNullOrUndefined(resSigned['result'])) {
      this.notificationService.showError('E-İmza şifrelemede hata oluştu. İmzali veri boş!');
      this.loadingContext.context.loading = false;
      return false;
    }
    return true;

  }

  private question(question: any, cbArray: any[], dtby: any) {
    this.notificationService.smartMessageBox({
      title: question.kalemNo + ' - ' + question.kod,
      content: question.aciklama,
      buttons: question.soruTip == 'Soru' ? '[HAYIR][EVET]' : '[TAMAM]'
    }, (result) => {
      question.cevap = result;
      if (result === 'EVET') {
        question.cevap = 'EVET';
      }
      if (result === 'HAYIR') {
        question.cevap = 'HAYIR';
      }
      if (result === 'TAMAM') {
        question.cevap = 'TAMAM';
      }
      this.answerQuestion(question, cbArray, dtby);
    });
  }

  private recursiveQuestion(cbArray: any[], dtby: any) {
    if (cbArray.length > 0) {
      let firstCb = deepCopy(cbArray[0]);
      cbArray.shift();
      let that = this;
      setTimeout(() => {
        that.question(firstCb, cbArray, dtby);
      }, 500);
    } else {
      let that = this;
      setTimeout(() => {
        that.eimzaSifreQuestion(that.tescilDetayliBeyan.bind(that), dtby);
      }, 500);
      // this.tescilDetayliBeyan(dtby);
    }
  }

  private signData(tescilXml): Observable<any> {
    let userString: string = localStorage.getItem(config.DINAZOR_USER_KEY);
    let user: AuthUser;
    if (userString) {
      user = JSON.parse(userString);
      if (!user) {
        return new Observable<any>(observer => {
          observer.next({status: -2});
          observer.complete();
        });
      }
    }


    return new Observable<any>(observer => {
      this.dnHttp.get('gtbuser/' + user.id).subscribe(res => {
        if (res.isSuccess) {
          let signData = {
            pin: res.data['eImzaPin'],
            data: tescilXml
          };
          return this.dnHttp.post(signData, 'dinazor/Sign', {
            useApi: false,
            useToken: false
          });
        } else {
          // TODO Status: -2
          return new Observable<any>(observer2 => {
            observer2.next({status: -2});
            observer2.complete();
          });
        }
      });
      observer.next({status: -2});
      observer.complete();
    });
  }

  private tescilBeyanProcess(tescilDataParam: any, pin: string, param1: string, param2: string, isKontrolRequired: boolean = true): void {
    if (!this.checkRequirment(tescilDataParam, isKontrolRequired)) return;
    //  this.loadingContext.context.loading = true;
    this.dnHttp.get(param1 + tescilDataParam.id).subscribe(res => {
      if (res.isSuccess) {
        this.dnHttp.get(`${param1}${tescilDataParam.id}/tasimasenet`).subscribe(tasimaSenetList => {
          if (tasimaSenetList.isSuccess) {
            let _data: any = res.data;
            _data.kullaniciKodu = this.gtbUser.bilgeKullaniciAdi;
            let xml: string = this.getBeyanXml(_data, tasimaSenetList.data, param1);
            this.log.debug(xml);

            if (this.gtbUser.bilgeKullaniciAdi == 'cankaya') {
              let tescilData = {
                'username': this.gtbUser.servisKullaniciAdi,
                'password': this.gtbUser.servisSifre,
                'id': _data.id,
                'signedData': 'MICANKAYAUNI'
              };
              this.dnHttp.post(tescilData, param2).subscribe(tescil => {
                if (tescil.isSuccess) {
                  this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
                } else {
                  this.notificationService.showDinazorResultMessage(tescil);
                }
                //    this.loadingContext.context.loading = false;
              });
            } else {
              this.dnHttp.post({pin: pin, data: xml}, 'dinazor/Sign', {
                useApi: false,
                useToken: false
              }).subscribe(signed => {
                if (!this.isSuccessSigned(signed)) {
                  //  this.loadingContext.context.loading = false;
                  return;
                }

                let tescilData = {
                  'username': this.gtbUser.servisKullaniciAdi,
                  'password': this.gtbUser.servisSifre,
                  'id': _data.id,
                  'signedData': signed['result']
                };
                this.dnHttp.post(tescilData, param2).subscribe(tescil => {
                  if (tescil.isSuccess) {
                    this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
                  } else {
                    this.notificationService.showDinazorResultMessage(tescil);
                  }
                  //    this.loadingContext.context.loading = false;
                });
              });
            }
          } else {
            //    this.loadingContext.context.loading = false;
          }
        });
      } else {
        // this.loadingContext.context.loading = false;
      }
    });
  }

  tescilDetayliBeyanPin(dtby: any){
    this.eimzaSifreQuestion(this.tescilDetayliBeyan.bind(this), dtby);
  }

  private tescilDetayliBeyan(dtbeyan: any, pin: string): void {
    this.loadingContext.context.loading = true;
    this.loadingContext.context.loadingText = 'Tescil verisi hazırlanıyor.';
    this.dnHttp.get('detaylibeyanv2/' + dtbeyan.id + '/TescilData').subscribe(res => {
      this.loadingContext.context.loadingText = 'Tescil dosyası oluşturuluyor.';
      if (res.isSuccess) {
        let dtby: any = res.data;
        dtby.kullaniciKodu = this.gtbUser.bilgeKullaniciAdi;
        let model: DetayliBeyanModel = new DetayliBeyanModel({
          refId: dtby.refId,
          detayliBeyan: dtby,
          kullaniciAdi: dtby.kullaniciKodu,
          sifre: this.gtbUser.bilgeSifre
        });
        model.detayliBeyan.kullaniciKodu = model.kullaniciAdi;

        let xml: string = DnXmlSerialize.serialize(model);
        xml = this.getXml(xml);
        console.log(xml);
        this.loadingContext.context.loadingText = 'Tescil dosyası imzalanıyor.';
        if (this.gtbUser.bilgeKullaniciAdi == 'cankaya') {
          let tescilData = {
            username: this.gtbUser.servisKullaniciAdi,
            password: this.gtbUser.servisSifre,
            id: dtby.id,
            signedData: 'MICANKAYA'
          };
          this.loadingContext.context.loadingText = 'Tescil dosyası Gümrük Bakanlığına gönderiliyor.';
          this.dnHttp.post(tescilData, 'detaylibeyan/TescilProduction').subscribe(tescil => {
            this.loadingContext.context.loading = false;
            if (tescil.isSuccess) {
              this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
            } else {
              this.notificationService.showDinazorResultMessage(tescil);
            }
          }, err => {
            this.loadingContext.context.loading = false;
          });
        } else {
          this.dnHttp.post({pin: pin, data: xml}, 'dinazor/Sign', {
            useApi: false,
            useToken: false
          }).subscribe(resSigned => {
            // if (res2['status'] == 1) {
            //   this.notificationService.showWarning('E-İmza Kartı okunamadı.');
            // }
            if (!this.isSuccessSigned(resSigned)) return;

            let tescilData = {
              username: this.gtbUser.servisKullaniciAdi,
              password: this.gtbUser.servisSifre,
              id: dtby.id,
              signedData: resSigned['result']
            };
            this.loadingContext.context.loadingText = 'Tescil dosyası Gümrük Bakanlığına gönderiliyor.';
            this.dnHttp.post(tescilData, 'detaylibeyan/TescilProduction').subscribe(tescil => {
              this.loadingContext.context.loading = false;
              if (tescil.isSuccess) {
                this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
              } else {
                this.notificationService.showDinazorResultMessage(tescil);
              }
            }, err => {
              this.loadingContext.context.loading = false;
            });
          }, error2 => {
            this.notificationService.showError('E-İmza şifrelemede hata oluştu.');
            this.loadingContext.context.loading = false;
          });
        }
      }
    });
  }
}

