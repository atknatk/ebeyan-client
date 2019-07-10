/**
 * Created by cabbar on 22.05.2017.
 */
import { NgModule } from '@angular/core';
import { CurrencyService } from './currency';

@NgModule({
  declarations: [],
  exports: [],
  providers: []
})
export class GtbModule {
  static forRoot() {
    return {
      ngModule: GtbModule,
      providers: []
    };
  }


}
