import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DnCrudModule,
  DnDatatableModule,
  DnHttpService,
  DnInputModule,
  DnLoadingModule,
  DnNotificationService,
  DnSelect2Module,
  DnWidgetsModule
} from '@dinazor/core';
import { OzetbeyanSharedModule } from '../gtb/shared/ozetbeyan/ozetbeyan-shared.module';
import { OzetbeyanListComponent } from './+ozetbeyan-list/ozetbeyan-list.component';
import { OzetbeyanTabComponent } from './+ozetbeyan/ozetbeyan-tab.component';
import { ozetbeyanRouting } from './ozetbeyan.routing';
import { OzetbeyanService } from './ozetbeyan.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DnLoadingModule,
    DnSelect2Module,
    DnDatatableModule,
    DnCrudModule,
    DnInputModule,
    DnWidgetsModule,
    ozetbeyanRouting,
    RouterModule,
    OzetbeyanSharedModule
  ],
  declarations: [
    OzetbeyanTabComponent,
    OzetbeyanListComponent,
    // TasimaSenetComponent,
    // TasimaSenetTabComponent,
    // TasimaSatirTabComponent,
    // TasimaSatirTabEsyaUlkeComponent,
    // TasimaSatirTabTasimaSatirComponent,
    // TasimaSatirTabIhracatComponent
  ],
  providers: [
    DnHttpService,
    DnNotificationService,
    {provide: 'IOzetbeyanService', useClass: OzetbeyanService}
    //  {provide: OzetBeyanNavigationService, useValue: new OzetBeyanNavigationService()}

  ]
})
export class OzetbeyanModule {
}
