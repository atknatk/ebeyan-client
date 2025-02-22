/**
 * Created by cabbar on 06.05.2017.
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, format?: any): any {
    return moment(value).format(format);
  }

}
