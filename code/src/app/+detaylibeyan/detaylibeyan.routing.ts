import { ModuleWithProviders } from '@angular/core';
/**
 * Created by cabbar on 03.05.2017.
 */
import { RouterModule, Routes } from '@angular/router';
import { DetaylibeyanListComponent } from './+detaylibeyan-list/detaylibeyan-list.component';
import { DetaylibeyanComponent } from './+detaylibeyan/detaylibeyan.component';
import { DetaylibeyanDokumanComponent } from './+dokuman/dokuman.component';
import { DetaylibeyanKalemComponent } from './+kalem/kalem.component';
import { DetaylibeyanKiymetComponent } from './+kiymet/kiymet.component';
import { DetaylibeyanKonteynerComponent } from './+konteyner/konteyner.component';
import { DetaylibeyanMarkaComponent } from './+marka/marka.component';
import { DetaylibeyanOzetbeyanComponent } from './+ozetbeyan/detaylibeyan-ozetbeyan.component';
import { DetaylibeyanTamamlayiciComponent } from './+tamamlayici/tamamlayici.component';
import { DetaylibeyanTcgbAcmaComponent } from './+tcgb-acma/tcgb-acma.component';
import { DetaylibeyanTeminatComponent } from './+teminat/teminat.component';
import { DetaylibeyanVergiComponent } from './+vergi/vergi.component';
import { DetaylibeyanViewComponent } from './+view/view.component';

export const detaylibeyanRoutes: Routes = [
  {
    path: 'detaylibeyan',
    component: DetaylibeyanComponent,
    data: {
      pageTitle: 'Detaylı Beyan'
    }
  },
  {
    path: 'kalem',
    component: DetaylibeyanKalemComponent,
    data: {
      pageTitle: 'Detaylı Beyan Kalem'
    }
  },
  {
    path: 'dokuman',
    component: DetaylibeyanDokumanComponent,
    data: {
      pageTitle: 'Detaylı Beyan Doküman Listesi'
    }
  },
  {
    path: 'ozetbeyan',
    component: DetaylibeyanOzetbeyanComponent,
    data: {
      pageTitle: 'Detaylı Beyan Özet Beyan'
    }
  },
  {
    path: 'vergi',
    component: DetaylibeyanVergiComponent,
    data: {
      pageTitle: 'Detaylı Beyan Vergi'
    }
  },
  {
    path: 'tcgb-acma',
    component: DetaylibeyanTcgbAcmaComponent,
    data: {
      pageTitle: 'Detaylı Beyan TCGB Açma'
    }
  },
  {
    path: 'tamamlayici',
    component: DetaylibeyanTamamlayiciComponent,
    data: {
      pageTitle: 'Detaylı Beyan Vergi'
    }
  },
  {
    path: 'marka',
    component: DetaylibeyanMarkaComponent,
    data: {
      pageTitle: 'Detaylı Beyan Vergi'
    }
  },
  {
    path: 'konteyner',
    component: DetaylibeyanKonteynerComponent,
    data: {
      pageTitle: 'Detaylı Beyan Konteyner'
    }
  },
  {
    path: 'teminat',
    component: DetaylibeyanTeminatComponent,
    data: {
      pageTitle: 'Detaylı Beyan Teminat'
    }
  },
  {
    path: 'detaylibeyan-list',
    component: DetaylibeyanListComponent,
    data: {
      pageTitle: 'Detaylı Beyan Listesi'
    }
  },
  {
    path: 'kiymet',
    component: DetaylibeyanKiymetComponent,
    data: {
      pageTitle: 'Detaylı Kıymet Listesi'
    }
  },
  {
    path: 'view',
    component: DetaylibeyanViewComponent,
    data: {
      pageTitle: 'Görüntüle'
    }
  }
];

export const detaylibeyanRouting: ModuleWithProviders = RouterModule.forChild(detaylibeyanRoutes);

