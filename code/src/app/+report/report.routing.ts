import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
export const reportRoutes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      pageTitle: 'Raporlar'
    }
  },
];

export const reportRouting: ModuleWithProviders = RouterModule.forChild(reportRoutes);

