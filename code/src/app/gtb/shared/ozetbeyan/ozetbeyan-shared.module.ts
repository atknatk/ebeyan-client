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
import { OzetbeyanComponent } from './+ozetbeyan/ozetbeyan.component';
import { OzetbeyanTasimaSenetComponent } from './+tasima-senet/ozetbeyan-tasima-senet.component';
import { OzetbeyanTabComponent } from './ozetbeyan-tab.component';
import { RepeaterService } from './repeater.service';
import { TanimlamalarModule } from '../../../+tanimlamalar/tanimlamalar.module';

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
    RouterModule,
    TanimlamalarModule
  ],
  declarations: [
    OzetbeyanTabComponent,
    OzetbeyanComponent,
    OzetbeyanTasimaSenetComponent,
  ],
  exports: [
    OzetbeyanTabComponent,
    OzetbeyanComponent,
    OzetbeyanTasimaSenetComponent
  ],
  providers: [
    // OzetbeyanService,
    DnHttpService,
    DnNotificationService,
    RepeaterService
  ]
})
export class OzetbeyanSharedModule {
}
