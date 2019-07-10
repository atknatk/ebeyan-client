import { Injectable } from '@angular/core';
/**
 * Created by cabbar on 22.05.2017.
 */
import { DnHttpService, isNullOrUndefined } from '@dinazor/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CurrencyService {

  private curr;

  constructor(private http: DnHttpService<any>) {
  }

  getCurrency(date?: Date): Observable<any> {
    if (this.curr && isNullOrUndefined(date)) {
      return Observable.of(this.curr);
    }
    return this.http.get('Currency').map(val => {
      if (val.isSuccess) {
        this.curr = val;
      }
      return val;
    });
  }

  getCurrencyWithDoviz(currencyCode: string, options?: { date?: Date, isIhracat?: boolean }): Observable<any> {
    if (this.curr) {
      const filtered = this.curr.data.filter(item => item.currencyCode == currencyCode);
      if (filtered.length == 0) {
        return Observable.of(0);
      } else {
        if (!isNullOrUndefined(options.isIhracat) && options.isIhracat == true) {
          return Observable.of(filtered[0].forexBuying);
        } else {
          return Observable.of(filtered[0].forexSelling);
        }
      }
    }
    return this.http.get('Currency').map(val => {
      if (val.isSuccess) {
        this.curr = val;
        const filtered = this.curr.data.filter(item => item.currencyCode == currencyCode);
        if (filtered.length == 0) {
          return 0;
        } else {
          if (!isNullOrUndefined(options.isIhracat) && options.isIhracat == true) {
            return filtered[0].forexBuying;
          } else {
            return filtered[0].forexSelling;
          }
        }
      }
      return 0;
    });
  }


  private getToday(td) {
    const d = new Date();
    return td.getDate() == d.getDate() && td.getMonth() == d.getMonth() && td.getFullYear() == d.getFullYear();
  }

}

