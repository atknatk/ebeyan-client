import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnCrudModule, DnLoadingModule, DnWidgetsModule } from '@dinazor/core';
import { DetaylibeyanListComponent } from './detaylibeyan-list.component';

const routes: Routes = [{
  path: '',
  component: DetaylibeyanListComponent
}];

const components = [
  DetaylibeyanListComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DnLoadingModule,
    DnWidgetsModule,
    DnCrudModule,
  ],
  declarations: [...components],
  providers: [...components]
})
export class DetaylibeyanListModule {
}
