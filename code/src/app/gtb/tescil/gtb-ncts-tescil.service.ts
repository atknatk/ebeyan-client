/**
 * Created by cabbar on 31.05.2017.
 */

import { Injectable } from '@angular/core';
import {
  AuthUser,
  deepCopy,
  DnHttpService,
  DnLoadingBase,
  DnLoggerService,
  DnNotificationService,
  DnStorageService,
  isNullOrUndefined
} from '@dinazor/core';
import { config } from '@dinazor/core/release/dinazor.config';
import { Observable } from 'rxjs/Observable';
import { DetayliBeyanModel } from '../../+model/detaylibeyan/detaylibeyan.model';
import { GtbUserModel } from '../../+model/gtbuser/gtb-user.model';
import { CC015BModel } from '../../+model/ncts/cc015b.model';
import { OzetBeyanModel } from '../../+model/ozetbeyan/ozetbeyan.model';
import { DnXmlSerialize } from '../../shared/utils/dn-serialize';
import { gtbConst } from '../gtb-const';


@Injectable()
export class NctsTescilService {

  private gtbUser: GtbUserModel;
  private user: any;

  constructor(private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private dnStorageService: DnStorageService,
              private log: DnLoggerService) {
    this.gtbUser = this.dnStorageService.getItem(gtbConst.gtbUserKey);
    this.user = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
  }

  soruDetayliBeyan(dtby?: any): void {
    if (!this.checkRequirment(dtby)) return;
    this.dnHttp.get('detaylibeyan/' + dtby.id + '/detaylibeyansoru').subscribe(res => {
      if (res.isSuccess) {
        let soruArr: any[] = res.data;
        if (soruArr && soruArr.length > 0) {
          this.initQuestion(soruArr, dtby);
        } else {
          this.eimzaSifreQuestion(this.tescilDetayliBeyan.bind(this), dtby);

          // this.tescilDetayliBeyan(dtby);
        }

      }
    });
  }

  tescil(data?: any): void {
    this.eimzaSifreQuestion(this.tescilBeyanProcess.bind(this), data, 'OzetBeyan', 'OzetBeyan/Tescil');
  }

  test(data: any, context: DnLoadingBase): void {
    if (!this.checkRequirment(data)) return;
    if (context)
      context['loading'] = true;
    this.dnHttp.get('nctsbeyan/' + data.id + '/TescilData').subscribe(res => {
      if (res.isSuccess) {
        let model: CC015BModel = new CC015BModel(res.data);
        model = this.mergeNcstModel(model);
        let xml: string = this.getXml(DnXmlSerialize.serializeNcts(model));
        this.log.debug(xml);

        this.dnHttp.post({
          signedData: xml,
          firmId: this.user.tenantKey,
          id: data.id
        }, 'NctsBeyan/SubmitDeclaration').subscribe(tescil => {
          if (tescil.isSuccess) {
            this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
          } else {
            this.notificationService.showDinazorResultMessage(tescil);
          }
          if (context)
          context['loading'] = false;
        });
      } else {
        this.notificationService.showDinazorResultMessage(res);
        if (context)
        context['loading'] = false;
      }
    });
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

  private checkRequirment(tescilDataParam: any): boolean {
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

    if (isNullOrUndefined(this.user.tenantKey)) {
      this.notificationService.showWarning('Kurumsal Anahtar bulunamamaktadır.', 'Kurumsal Anahtar Hatası!');
      return false;
    }

    return true;
  }

  private eimzaSifreQuestion(cb: (model, pin, param1?, param2?) => void, model: any, param1?: any, param2?: any) {
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
          cb(model, value, param1, param2);
        }
      } else {
        this.notificationService.showWarning('İsteğiniz üzerine tescil işlemi iptal edilmiştir.', 'İptal');
      }
    });
  }

  private getXml(tescilXml) {
    return `<?xml version="1.0"?><CC015B>` + tescilXml + `</CC015B>`;
  }

  private initQuestion(cbArray: any[], dtby: any) {
    let firstCb = deepCopy(cbArray[0]);
    cbArray.shift();
    this.question(firstCb, cbArray, dtby);
  }

  private mergeNcstModel(model: CC015BModel): CC015BModel {
    model.synIdeMES1 = 'UNOC';
    model.synVerNumMES2 = '3';
    model.mesSenMES3 = 'NTA.TR';
    model.mesRecMES6 = 'NTA.TR';
    model.datOfPreMES9 = '111220';
    model.timOfPreMES10 = '1710';
    model.intConRefMES11 = '11122017100875';
    model.ackReqMES16 = '0';
    model.tesIndMES18 = '0';
    model.mesIdeMES19 = '11122017100829';
    model.mesTypMES20 = 'CC015B';
    return model;
  }

  private question(question: any, cbArray: any[], dtby: any) {
    this.notificationService.smartMessageBox({
      title: question.kalemNo + ' - ' + question.kod,
      content: question.aciklama,
      buttons: question.soruTip.id == 'Soru' ? '[HAYIR][EVET]' : '[TAMAM]'
    }, (result) => {
      question.cevap = {
        name: result,
        id: result
      };
      if (result === 'EVET') {
        question.cevap.id = 1;
      }
      if (result === 'HAYIR') {
        question.cevap.id = 2;
      }
      if (result === 'TAMAM') {
        question.cevap.id = 3;
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
      this.dnHttp.get('gtbuser/' + user.id,).subscribe(res => {
        if (res.isSuccess) {
          let signData = {
            pin: res.data['eImzaPin'],
            data: tescilXml
          };
          return this.dnHttp.post(signData, 'dinazor/Sign', {
            useToken: false,
            useApi: false
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

  private tescilBeyanProcess(tescilDataParam: any, pin: string, param1: string, param2: string): void {
    if (!this.checkRequirment(tescilDataParam)) return;

    this.dnHttp.get(param1 + tescilDataParam.id).subscribe(res => {
      if (res.isSuccess) {
        let _data: any = res.data;
        _data.tasitVarisTarih = new Date();
        _data.kullaniciKodu = this.gtbUser.bilgeKullaniciAdi;
        let model: OzetBeyanModel = new OzetBeyanModel({
          refId: _data.refId,
          ozetBeyan: _data,
          kullaniciAdi: _data.kullaniciKodu,
          sifre: this.gtbUser.bilgeSifre
        });
        model.ozetBeyan.xmlRefId = _data.tescilNo;

        let xml: string = this.getXml(DnXmlSerialize.serialize(model));
        this.log.debug(xml);

        this.dnHttp.post({pin: pin, data: xml}, 'dinazor/Sign', {
          useToken: false,
          useApi: false
        }).subscribe(signed => {
          let tescilData = {
            'username': this.gtbUser.servisKullaniciAdi, // 'KLCYZLM',
            'password': this.gtbUser.servisSifre, // 'aaa123!A',
            'id': _data.id,
            'signedData': signed['result']
          };
          this.dnHttp.post(tescilData, param2).subscribe(tescil => {
            if (tescil.isSuccess) {
              this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
            }
          });
        });
      }
    });
  }

  private tescilDetayliBeyan(dtby: any, pin: string): void {

    this.dnHttp.get('detaylibeyan/' + dtby.id + '/Join').subscribe(res => {
      if (res.isSuccess) {
        let dtby2: any = res.data;
        dtby2.tasitVarisTarih = new Date();
        dtby2.kullaniciKodu = this.gtbUser.bilgeKullaniciAdi;
        let model: DetayliBeyanModel = new DetayliBeyanModel({
          refId: dtby2.refId,
          detayliBeyan: dtby2.kullaniciKodu,
          sifre: this.gtbUser.bilgeSifre
        });
        model.detayliBeyan.kullaniciKodu = model.kullaniciAdi;

        let xml: string = DnXmlSerialize.serialize(model);
        xml = this.getXml(xml);
        console.log(xml);

        this.dnHttp.post({pin: pin, data: xml}, 'dinazor/Sign', {
          useToken: false,
          useApi: false
        }).subscribe(resSigned => {
          // if (res2['status'] == 1) {
          //   this.notificationService.showWarning('E-İmza Kartı okunamadı.');
          // }
          let tescilData = {
            username: this.gtbUser.servisKullaniciAdi,
            password: this.gtbUser.servisSifre,
            id: dtby.id,
            signedData: resSigned['result']
          };
          this.dnHttp.post(tescilData, 'detaylibeyan/TescilProduction').subscribe(tescil => {
            if (tescil.isSuccess) {
              this.notificationService.showSuccess('Tescil işleminiz gümrük tarafından kuyruğa alınmıştır.');
            }
          });
        });
      }
    });
  }

}

