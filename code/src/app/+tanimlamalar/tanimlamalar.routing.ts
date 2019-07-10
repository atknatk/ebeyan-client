import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmaComponent } from './+firma/firma.component';
import { GtbUserComponent } from './+gtb-user/gtb-user.component';
import { FaturaComponent } from './+fatura/fatura.component';

export const tanimlamalarRoutes: Routes = [
  {
    path: 'firma',
    component: FirmaComponent,
    data: {
      pageTitle: 'Firma Tanımlama'
    }
  },
  {
    path: 'gtbuser',
    component: GtbUserComponent,
    data: {
      pageTitle: 'Gtb Kullanıcı Tanımlama'
    }
  },
  {
    path: 'efatura',
    component: FaturaComponent,
    data: {
      pageTitle: 'E-Fatura Tanımlama'
    }
  }
];

export const tanimlamalarRouting: ModuleWithProviders = RouterModule.forChild(tanimlamalarRoutes);

