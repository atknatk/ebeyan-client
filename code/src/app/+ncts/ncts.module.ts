/**
 * Created by cabbar on 03.05.2017.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { nctsRouting } from './ncts.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { NctsComponent } from './+ncts/ncts.component';
import { NctsListComponent } from './+ncts-list/ncts-list.component';
import { NctsKalemComponent } from './+kalem/kalem.component';
import { NctsNoLabelComponent } from './utils/ncts-no-label.component';
import { NctsOzetbeyanComponent } from './+ozetbeyan/ozetbeyan.component';
import { NctsAntrepoComponent } from './+antrepo/antrepo.component';
import { NctsHareketComponent } from './+hareket/hareket.component';
import { NctsDetayComponent } from './+ncts-detay/ncts-detay.component';
import { NctsDetayTeminatComponent } from './+ncts-detay/teminat/teminat.component';
import { NctsDetayGuzergahComponent } from './+ncts-detay/guzergah/guzergah.component';
import { NctsDetayTransitComponent } from './+ncts-detay/transit/transit.component';
import { NctsDetayMuhurComponent } from './+ncts-detay/muhur/muhur.component';
import { NctsKalemDetayComponent } from './+kalem/kalem-detay/kalem-detay.component';
import { NctsKalemDetayKapComponent } from './+kalem/kalem-detay/kap/kap.component';
import { NctsKalemDetayKonteynerComponent } from './+kalem/kalem-detay/konteyner/konteyner.component';
import { NctsKalemDetayHassasEsyaComponent } from './+kalem/kalem-detay/hassas-esya/hassas-esya.component';
import { NctsKalemDetayOncekiBelgeComponent } from './+kalem/kalem-detay/onceki-belge/onceki-belge.component';
import { NctsKalemDetayEkBilgiComponent } from './+kalem/kalem-detay/ek-bilgi/ek-bilgi.component';
import { NctsKalemDetaySunulanBelgeComponent } from './+kalem/kalem-detay/sunulan-belge/sunulan-belge.component';
import { DnCrudModule, DnInputModule, DnLoadingModule, DnSelect2Module, DnWidgetsModule } from '@dinazor/core';


@NgModule({
  imports: [
    CommonModule,
    nctsRouting,
    ReactiveFormsModule,
    DnSelect2Module,
    DnCrudModule,
    DnWidgetsModule,
    DnInputModule,
    DnLoadingModule
  ],
  declarations: [
    NctsComponent,
    NctsListComponent,
    // Kalem
    NctsKalemComponent,
    NctsKalemDetayKapComponent,
    NctsKalemDetayKonteynerComponent,
    NctsKalemDetayHassasEsyaComponent,
    NctsKalemDetayOncekiBelgeComponent,
    NctsKalemDetayEkBilgiComponent,
    NctsKalemDetaySunulanBelgeComponent,

    NctsNoLabelComponent,
    NctsOzetbeyanComponent,
    NctsAntrepoComponent,
    NctsHareketComponent,

    NctsDetayComponent,
    NctsDetayTeminatComponent,
    NctsDetayGuzergahComponent,
    NctsDetayTransitComponent,
    NctsDetayMuhurComponent
  ],
  providers: []
})

export class NctsModule {
}
