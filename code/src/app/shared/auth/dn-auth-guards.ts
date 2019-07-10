/**
 * Created by cabbar on 19.04.2017.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DnStorageService } from '@dinazor/core';
import { config } from '@dinazor/core/release/dinazor.config';

@Injectable()
export class DnAuthGuard implements CanActivate {
  constructor(private router: Router,
              private dnStorageService: DnStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.dnStorageService.getItem(config.DINAZOR_USER_KEY)) {
      return true;
    }
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
