import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VarisbildirimiListComponent } from './+varisbildirimi+list/varisbildirimi-list.component';
import { VarisbildirimiTabComponent } from './+varisbildirimi/varisbildirimi-tab.component';

export const varisbildirimiRoutes: Routes = [
  {
    path: 'varisbildirimi-list',
    component: VarisbildirimiListComponent,
    data: {
      pageTitle: 'Varış Bildirimi Listesi'
    }
  },
  {
    path: 'varisbildirimi',
    component: VarisbildirimiTabComponent,
    data: {
      pageTitle: 'Varış Bildirimi'
    }
  },
  {
    path: 'varisbildirimi/:id',
    component: VarisbildirimiTabComponent,
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

export const varisbildirimiRouting: ModuleWithProviders = RouterModule.forChild(varisbildirimiRoutes);

