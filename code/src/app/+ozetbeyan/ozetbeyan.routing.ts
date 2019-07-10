import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OzetbeyanListComponent } from './+ozetbeyan-list/ozetbeyan-list.component';
import { OzetbeyanTabComponent } from './+ozetbeyan/ozetbeyan-tab.component';
import { OzetbeyanDetailResolverService } from './ozetbeyan-detail-resolver.service';

export const ozetbeyanRoutes: Routes = [
  {
    path: 'ozetbeyan-list',
    component: OzetbeyanListComponent,
    data: {
      pageTitle: 'Özet Beyan Listesi'
    }
  },
  {
    path: 'ozetbeyan',
    component: OzetbeyanTabComponent,
    data: {
      pageTitle: 'Özet Beyan'
    }
  },
  {
    path: 'ozetbeyan/:id',
    component: OzetbeyanTabComponent,
    /*resolve: {
      ozetBeyan: OzetbeyanDetailResolverService
    },*/
    data: {
      pageTitle: 'Özet Beyan'
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

export const ozetbeyanRouting: ModuleWithProviders = RouterModule.forChild(ozetbeyanRoutes);

