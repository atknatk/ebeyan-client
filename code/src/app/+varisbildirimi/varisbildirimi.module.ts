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
import { VarisbildirimiListComponent } from './+varisbildirimi+list/varisbildirimi-list.component';
import { VarisbildirimiTabComponent } from './+varisbildirimi/varisbildirimi-tab.component';
import { VarisbildirimiService } from './varisbildirimi.service';
import { varisbildirimiRouting } from './varisbildirimi.routing';

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
    varisbildirimiRouting,
    RouterModule,
    OzetbeyanSharedModule
  ],
  declarations: [
    VarisbildirimiTabComponent,
    VarisbildirimiListComponent
  ],
  providers: [
    DnHttpService,
    DnNotificationService,
    {provide: 'IOzetbeyanService', useClass: VarisbildirimiService}

  ]
})
export class VarisbildirimiModule {
}
