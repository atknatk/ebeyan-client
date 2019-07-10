import { Component } from '@angular/core';
import { config } from '@dinazor/core';
import { AppReadyEvent } from './app.service';

declare let $: any;

@Component({
  selector: 'dinazor-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(appReadyEvent: AppReadyEvent) {
    config.smartSkin = 'smart-style-3';
    setTimeout(() => {
      appReadyEvent.trigger();
    }, 100);
  }
}
