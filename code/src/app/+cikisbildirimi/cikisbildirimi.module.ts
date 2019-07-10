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
import { cikisbildirimiRouting } from './cikisbildirimi.routing';
import { CikisbildirimiService } from './cikisbildirimi.service';
import { CikisbildirimiListComponent } from './+cikisbildirimi+list/cikisbildirimi-list.component';
import { CikisbildirimiTabComponent } from './+cikisbildirimi/cikisbildirimi-tab.component';

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
    cikisbildirimiRouting,
    RouterModule,
    OzetbeyanSharedModule
  ],
  declarations: [
    CikisbildirimiTabComponent,
    CikisbildirimiListComponent
  ],
  providers: [
    DnHttpService,
    DnNotificationService,
    {provide: 'IOzetbeyanService', useClass: CikisbildirimiService}

  ]
})
export class CikisbildirimiModule {
}
