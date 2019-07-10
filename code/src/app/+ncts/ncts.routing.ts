/**
 * Created by cabbar on 03.05.2017.
 */
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NctsComponent } from './+ncts/ncts.component';
import { NctsListComponent } from './+ncts-list/ncts-list.component';
import { NctsKalemComponent } from './+kalem/kalem.component';
import { NctsOzetbeyanComponent } from './+ozetbeyan/ozetbeyan.component';
import { NctsAntrepoComponent } from './+antrepo/antrepo.component';
import { NctsHareketComponent } from './+hareket/hareket.component';
import { NctsDetayComponent } from './+ncts-detay/ncts-detay.component';

export const nctsRoutes: Routes = [
  {
    path: 'ncts',
    component: NctsComponent,
    data: {
      pageTitle: 'NCTS'
    }
  },
  {
    path: 'ncts-detay',
    component: NctsDetayComponent,
    data: {
      pageTitle: 'NCTS Detay'
    }
  },
  {
    path: 'ncts-list',
    component: NctsListComponent,
    data: {
      pageTitle: 'NCTS Liste'
    }
  },
  {
    path: 'kalem',
    component: NctsKalemComponent,
    data: {
      pageTitle: 'NCTS Kalemler'
    }
  },
  {
    path: 'ozetbeyan',
    component: NctsOzetbeyanComponent,
    data: {
      pageTitle: 'NCTS Özet Beyan Açma Listesi'
    }
  },
  {
    path: 'antrepo',
    component: NctsAntrepoComponent,
    data: {
      pageTitle: 'NCTS Antrepo'
    }
  },
  {
    path: 'hareket',
    component: NctsHareketComponent,
    data: {
      pageTitle: 'NCTS Hareket Yanıtı'
    }
  }
];

export const nctsRouting: ModuleWithProviders = RouterModule.forChild(nctsRoutes);

