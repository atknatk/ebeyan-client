import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
import { UtilsModule } from '../utils/utils.module';
import { AuthLayoutComponent } from './app-layouts/auth-layout.component';
import { EmptyLayoutComponent } from './app-layouts/empty-layout.component';
import { MainLayoutComponent } from './app-layouts/main-layout.component';
import { FooterComponent } from './footer/footer.component';

import { HeaderModule } from './header/header.module';
import { LayoutService } from './layout.service';
import { NavigationModule } from './navigation/navigation.module';
import { RibbonComponent } from './ribbon/ribbon.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterModule,
    UtilsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    FooterComponent,
    RibbonComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    AuthLayoutComponent,
  ],
  exports: [
    HeaderModule,
    NavigationModule,
    FooterComponent,
    RibbonComponent,
  ],
  providers: [LayoutService]
})
export class LayoutModule {

}
