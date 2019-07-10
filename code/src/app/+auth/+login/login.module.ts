import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnLoadingModule } from '@dinazor/core';
import { DnAuthService } from '@dinazor/core/release/views/auth/auth.service';
import { DnLoginConfigService } from '@dinazor/core/release/views/auth/login/login-config.service';
import { DnLoginModule } from '@dinazor/core/release/views/auth/login/login.module';
import { appConfig } from '../../app.config';
import { UtilsModule } from '../../shared/utils/utils.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    UtilsModule.forRoot(),
    DnLoadingModule,
    appConfig.isGumruk ?
      DnLoginModule.forRoot({
        title: 'GTB E-Beyan Uygulaması',
        description: 'Gümrük ve Ticaret Bakanlığı E-Beyan Uygulaması',
        afterLoginNavigateRoute: '/home',
        logo: 'assets/img/gumruk_logo_256.png'
      }) :
      DnLoginModule.forRoot({
        title: 'E-Beyan Uygulaması',
        description: 'Test E-Beyan Uygulaması',
        afterLoginNavigateRoute: '/home',
        logo: 'http://www.deonbotha.com/wp-content/uploads/2016/02/transparent.png'
      })
  ],
  declarations: [LoginComponent],
  providers: [DnLoginConfigService, DnAuthService]
})
export class LoginModule {
}
