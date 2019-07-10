/**
 * Created by cabbar on 03.05.2017.
 */
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const tcgbRoutes: Routes = [
  /*  {
      path: 'tcgb',
      component: DetaylibeyanComponent,
      data: {
        pageTitle: 'TCGB'
      }
    }*/
];

export const tcgbRouting: ModuleWithProviders = RouterModule.forChild(tcgbRoutes);

