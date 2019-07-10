/**
 * Created by griga on 7/11/16.
 */


import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layout/app-layouts/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
import { DnAuthGuard } from './shared/auth/dn-auth-guards';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '', redirectTo: '/auth/login', pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: 'app/+home/home.module#HomeModule'
      },
      {
        path: 'ozetbeyan',
        loadChildren: 'app/+ozetbeyan/ozetbeyan.module#OzetbeyanModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'cikisbildirimi',
        loadChildren: 'app/+cikisbildirimi/cikisbildirimi.module#CikisbildirimiModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'varisbildirimi',
        loadChildren: 'app/+varisbildirimi/varisbildirimi.module#VarisbildirimiModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'detaylibeyan',
        loadChildren: 'app/+detaylibeyan/detaylibeyan.module#DetaylibeyanModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'ncts',
        loadChildren: 'app/+ncts/ncts.module#NctsModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'report',
        loadChildren: 'app/+report/report.module#ReportModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'kullanici',
        loadChildren: 'app/+user/user.module#UserModule', canActivate: [DnAuthGuard]
      },
      {
        path: 'tanimlamalar',
        loadChildren: 'app/+tanimlamalar/tanimlamalar.module#TanimlamalarModule', canActivate: [DnAuthGuard]
      }

    ]
  },

  {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
