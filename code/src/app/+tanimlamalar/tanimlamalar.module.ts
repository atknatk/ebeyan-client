import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DnCrudModule,
  DnDatatableModule,
  DnInputModule,
  DnLoadingModule,
  DnSelect2Module,
  DnWidgetsModule
} from '@dinazor/core';
import { ModalModule } from 'ngx-bootstrap';
import { FaturaComponent } from './+fatura/fatura.component';
import { FirmaModalComponent } from './+firma/firma-modal.component';
import { FirmaComponent } from './+firma/firma.component';
import { GtbUserComponent } from './+gtb-user/gtb-user.component';
import { tanimlamalarRouting } from './tanimlamalar.routing';

@NgModule({
  imports: [
    CommonModule,
    tanimlamalarRouting,
    DnCrudModule,
    ReactiveFormsModule,
    DnLoadingModule,
    DnDatatableModule,
    DnInputModule,
    DnSelect2Module,
    DnWidgetsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    FirmaComponent,
    FaturaComponent,
    GtbUserComponent,
    FirmaModalComponent
  ], exports: [
    FirmaModalComponent
  ]
})
export class TanimlamalarModule {
}
