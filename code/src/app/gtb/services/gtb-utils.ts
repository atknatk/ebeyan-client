import { Injectable } from '@angular/core';
/**
 * Created by cabbar on 22.05.2017.
 */
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class GtbUtils {


  constructor() {
  }

  public isIhracat(rejim: string) {
    return rejim.indexOf('10') == 0 || rejim.indexOf('31') == 0 || rejim.indexOf('21') == 0 || rejim.indexOf('23') == 0
      || rejim.indexOf('26') == 0;
  }

}

