import { NgModule } from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { BodyService } from './body.service';
import { ContenteditableModelDirective } from './dn-editable-directive';
import { DnNotificationService } from '@dinazor/core';

@NgModule({
  declarations: [
    MomentPipe,
     ContenteditableModelDirective],
  exports: [
    MomentPipe,
     ContenteditableModelDirective],
  providers: [BodyService, DnNotificationService]
})
export class UtilsModule {
  static forRoot() {
    return {
      ngModule: UtilsModule,
      providers: [BodyService, DnNotificationService]
    };
  }


}
