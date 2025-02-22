import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageTitle: 'Home'
    }
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

