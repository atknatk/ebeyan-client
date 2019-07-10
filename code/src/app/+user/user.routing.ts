import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ModuleWithProviders } from '@angular/core';
import { DnUserComponent } from '@dinazor/core';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      pageTitle: 'Kullanıcı'
    }
  }
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

