import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../../shared/services/cache/cache.service';
import { EvHttpService } from '../../shared/services/http/http.service';
import { EvNotificationService } from '../../shared/services/notification/notification.service';
import { SubscriberService } from '../../shared/services/subscriber/subscriber.service';
import { currencyTrim } from '../../shared/utils/utils';
import { coinType } from './coin.enum';

@Component({
  template: `
    <dn-loading-content [show]="loading">

      <div class="dn-content-wrapper">

        <div class="dn-button-content">
          <div class="button-nav">
            <ul>
              <li [class.active]="isActive('detaylibeyan')">
                <a href="#{{getNav('detaylibeyan')}}">
                  <span class="button-item-parent">Detaylı Beyan</span>
                </a>
              </li>
              <li [class.active]="isActive('kalem')">
                <a href="#{{getNav('kalem')}}">
                  <span class="button-item-parent">Kalem</span>
                </a>
              </li>
              <li *ngIf="showButton('kiymet')" [class.active]="isActive('kiymet')">
                <a href="#{{getNav('kiymet')}}">
                  <span class="menu-item-parent">Kıymet</span>
                </a>
              </li>
              <li [class.active]="isActive('dokuman')">
                <a href="#{{getNav('dokuman')}}">
                  <span class="button-item-parent">Doküman</span>
                </a>
              </li>
              <li *ngIf="showButton('ozetbeyan')" [class.active]="isActive('ozetbeyan')">
                <a href="#{{getNav('ozetbeyan')}}">
                  <span class="button-item-parent">Özet beyan</span>
                </a>
              </li>
              <li *ngIf="showButton('vergi')" [class.active]="isActive('vergi')">
                <a href="#{{getNav('vergi')}}">
                  <span class="button-item-parent">Vergi</span>
                </a>
              </li>
              <li [class.active]="isActive('tcgb-acma')">
                <a href="#{{getNav('tcgb-acma')}}">
                  <span class="button-item-parent">TCGB Açma</span>
                </a>
              </li>
              <li [class.active]="isActive('teminat')">
                <a href="#{{getNav('teminat')}}">
                  <span class="button-item-parent">Teminat</span>
                </a>
              </li>
              <li [class.active]="isActive('tamamlayici')">
                <a href="#{{getNav('tamamlayici')}}">
                  <span class="button-item-parent">Tamamlayıcı</span>
                </a>
              </li>
              <li *ngIf="showButton('marka')" [class.active]="isActive('marka')">
                <a href="#{{getNav('marka')}}">
                  <span class="button-item-parent">Marka</span>
                </a>
              </li>
              <li [class.active]="isActive('konteyner')">
                <a href="#{{getNav('konteyner')}}">
                  <span class="button-item-parent">Konteyner</span>
                </a>
              </li>
              <li>
                <hr>
              </li>
            </ul>
          </div>
        </div>
        <div class="dn-content">
          <div class="row">
            <router-outlet></router-outlet>
          </div>
        </div>

      </div>
    </dn-loading-content>
  `,
  styleUrls: ['./detaylibeyan-navigation.component.css']
})
export class DetaylibeyanNavigationComponent implements OnInit, AfterViewInit, OnDestroy {


  constructor(private _router: Router) {

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // this._cd.detach();
  }

  ngOnInit(): void {
  }

  private getNav(nav) {
    return '/detaylibeyan/' + nav + '?idDetayliBeyan=' + this.idDetayliBeyan;
  }

  private isActive(nav) {
    return nav == this.curNav;
  }

  @Input() idDetayliBeyan: number;
  @Input() detayliBeyan: any;
  @Input() curNav: string;
  private ihracatMenu = ['marka'];
  private ithalatMenu = ['vergi', 'kiymet', 'ozetbeyan'];

}
