import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DnLogoutConfigService } from '@dinazor/core';
import { appConfig } from '../../../app.config';

declare let $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  appConf = appConfig;
  searchMobileActive = false;

  constructor(private router: Router,
              private logoutService: DnLogoutConfigService) {
    this.logoutService.logoutConfig.afterLogoutSuccessEvent = () => {
      localStorage.clear();
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }

  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }
}
