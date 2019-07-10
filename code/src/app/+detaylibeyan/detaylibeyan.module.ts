import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DnCrudModule, DnInputModule, DnLoadingModule, DnSelect2Module, DnWidgetsModule } from '@dinazor/core';
import { DetaylibeyanSoruComponent } from 'app/+detaylibeyan/+soru/soru.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap';
import { TanimlamalarModule } from '../+tanimlamalar/tanimlamalar.module';
import { DnValidation } from '../shared/utils/validation/dn-validation';
import { DetaylibeyanListComponent } from './+detaylibeyan-list/detaylibeyan-list.component';
import { DetayliBeyanValidationService } from './+detaylibeyan/detaylibeyan-validations.service';
import { DetaylibeyanComponent } from './+detaylibeyan/detaylibeyan.component';
import { DetaylibeyanDokumanComponent } from './+dokuman/dokuman.component';
import { DetaylibeyanKalemBaseComponent } from './+kalem/base/base.component';
import { DetaylibeyanKalemComponent } from './+kalem/kalem.component';
import { KalemService } from './+kalem/kalem.service';
import { KalemListModalComponent } from './+kalem/list-modal/kalem-list-modal.component';
import { DetaylibeyanKiymetKalemComponent } from './+kiymet/kalem/kiymet-kalem.component';
import { DetaylibeyanKiymetComponent } from './+kiymet/kiymet.component';
import { DetaylibeyanKonteynerComponent } from './+konteyner/konteyner.component';
import { DetaylibeyanMarkaComponent } from './+marka/marka.component';
import { DetaylibeyanOzetbeyanComponent } from './+ozetbeyan/detaylibeyan-ozetbeyan.component';
import { DetaylibeyanTamamlayiciComponent } from './+tamamlayici/tamamlayici.component';
import { DetaylibeyanTcgbAcmaComponent } from './+tcgb-acma/tcgb-acma.component';
import { DetaylibeyanTeminatComponent } from './+teminat/teminat.component';
import { DetaylibeyanVergiComponent } from './+vergi/vergi.component';
import { DetaylibeyanViewComponent } from './+view/view.component';
import { detaylibeyanRouting } from './detaylibeyan.routing';
import { DetaylibeyanButtonListComponent } from './utils/detaylibeyan-button-list.component';
import { DetaylibeyanNoLabelComponent } from './utils/detaylibeyan-no-label.component';
import { DetaylibeyanOzetComponent } from './utils/detaylibeyan-ozet.component';
import { DetayliBeyanKalemValidationService } from './validation/kalem-validations.service';
import { DetayliBeyanTeslimSekliValidationService } from './validation/teslim-sekli-validations.service';
import { DetaylibeyanKontrolComponent } from './utils/detaylibeyan-kontrol.component';


@NgModule({
  imports: [
    CommonModule,
    detaylibeyanRouting,
    ReactiveFormsModule,
    RouterModule,
    DnWidgetsModule,
    DnLoadingModule,
    DnSelect2Module,
    DnInputModule,
    DnCrudModule,
    PdfViewerModule,
    ModalModule.forRoot(),
    TanimlamalarModule

  ],
  declarations: [

    DetaylibeyanComponent,
    // Kalem,
    DetaylibeyanKalemComponent,
    DetaylibeyanKalemBaseComponent,
    // List
    DetaylibeyanListComponent,
    // Dokuman
    DetaylibeyanDokumanComponent,
    // Özet Beyan
    DetaylibeyanOzetbeyanComponent,
    // Vergi
    DetaylibeyanVergiComponent,
    // Tamamlayici
    DetaylibeyanTamamlayiciComponent,
    // Marka
    DetaylibeyanMarkaComponent,
    // Teminat
    DetaylibeyanTeminatComponent,
    // Utils
    DetaylibeyanNoLabelComponent,
    // Konteyner
    DetaylibeyanKonteynerComponent,
    // Kıymet
    DetaylibeyanKiymetComponent,
    DetaylibeyanKiymetKalemComponent,

    // TcgbAcma
    DetaylibeyanTcgbAcmaComponent,

    // View
    DetaylibeyanViewComponent,
    // PdfViewerComponent,
    DetaylibeyanButtonListComponent,

    KalemListModalComponent,

    DetaylibeyanOzetComponent,

    // Soru
    DetaylibeyanSoruComponent,

    // Tescil vb.
    DetaylibeyanKontrolComponent
  ],
  providers: [
    DnValidation,
    DetayliBeyanValidationService,
    DetayliBeyanTeslimSekliValidationService,
    DetayliBeyanKalemValidationService,
    KalemService
  ]
})
export class DetaylibeyanModule {
}
