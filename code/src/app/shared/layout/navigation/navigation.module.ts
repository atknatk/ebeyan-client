import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BigBreadcrumbsComponent } from './big-breadcrumbs.component';
import { DinazorMenuComponent } from './dinazor-menu.component';
import { DinazorMenuService } from './dinazor-menu.service';
import { MinifyMenuComponent } from './minify-menu.component';
import { NavigationComponent } from './navigation.component';
import { SmartMenuDirective } from './smart-menu.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    DinazorMenuComponent,
    SmartMenuDirective,
  ],
  exports: [
    BigBreadcrumbsComponent,
    MinifyMenuComponent,
    NavigationComponent,
    DinazorMenuComponent,
    SmartMenuDirective,
  ],
  providers: [DinazorMenuService]
})
export class NavigationModule {
}
