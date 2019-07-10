import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import './vendor';
import { DnHttpService } from '@dinazor/core';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic([DnHttpService]).bootstrapModule(AppModule);
