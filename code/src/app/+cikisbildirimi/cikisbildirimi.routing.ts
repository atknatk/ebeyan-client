import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CikisbildirimiTabComponent } from './+cikisbildirimi/cikisbildirimi-tab.component';
import { CikisbildirimiListComponent } from './+cikisbildirimi+list/cikisbildirimi-list.component';

export const cikisbildirimiRoutes: Routes = [
  {
    path: 'cikisbildirimi-list',
    component: CikisbildirimiListComponent,
    data: {
      pageTitle: 'Çıkış Bildirimi Listesi'
    }
  },
  {
    path: 'cikisbildirimi',
    component: CikisbildirimiTabComponent,
    data: {
      pageTitle: 'Varış Bildirimi'
    }
  },
  {
    path: 'cikisbildirimi/:id',
    component: CikisbildirimiTabComponent,
    /*resolve: {
      ozetBeyan: OzetbeyanDetailResolverService
    },*/
    data: {
      pageTitle: 'Varış Bildirimi'
    }
  },
  // {
  //   path: 'tasimasenet',
  //   component: TasimaSenetComponent,
  //   data: {
  //     pageTitle: 'Özet Beyan'
  //   }
  // }
];

export const cikisbildirimiRouting: ModuleWithProviders = RouterModule.forChild(cikisbildirimiRoutes);

