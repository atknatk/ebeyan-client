import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DnCoreLightModule,
  DnHttpService,
  DnLoadingModule,
  DnLoggerLevel,
  DnLoggerModule,
  DnLoggerService,
  DnServiceModule
} from '@dinazor/core';
import { config } from '@dinazor/core/release/dinazor.config';
import { CacheService } from 'ng2-cache';
import { Ng2Webstorage } from 'ng2-webstorage';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from '../environments/environment';
import { AuthModule } from './+auth/auth.module';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import { routing } from './app.routing';
import { AppReadyEvent, AppState, InternalStateType } from './app.service';
import { DnAuthGuard } from './shared/auth/dn-auth-guards';
// Core providers
import { LayoutModule } from './shared/layout/layout.module';
import { GtbUtils } from './gtb/services/gtb-utils';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    DnCoreLightModule,
    DnServiceModule,
    DnLoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: environment.isDebugMode ? DnLoggerLevel.OFF : DnLoggerLevel.OFF,
      serverLogLevel: DnLoggerLevel.OFF
    }),
    DnLoadingModule.forRoot({
      primaryColour: '#3a3633',
      secondaryColour: '#efefef',
      tertiaryColour: '#BD2A2A'
    }),
    routing
  ],
  exports: [],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    DnAuthGuard,
    CacheService,
    AppReadyEvent,
    GtbUtils
  ]
})
export class AppModule {
  constructor(logger: DnLoggerService, http: DnHttpService<any>) {
    config.debugState = false;
    logger.debug('AppModule', 'App is starting');
  }
}
