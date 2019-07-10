/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, Input } from '@angular/core';
import { isNullOrUndefined } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { GtbUtils } from '../../gtb/services/gtb-utils';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;


@Component({
  selector: 'detaylibeyan-button-list',
  template: `
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
    </div>`,
  styles: [`
    .button-nav {
      display: block;
      box-sizing: border-box;
    }

    .button-nav ul {
      width: 100%;
      padding: 40px 28px 25px 0;
      padding: 0;
      margin: 0;
      font-size: 13px;
      line-height: .5em;
      list-style: none;
      position: relative;
    }

    .button-nav ul li a {
      line-height: normal;
      font-size: 14px;
      padding: 10px 10px 10px 11px;
      color: #c0bbb7;
      display: block;
      font-weight: 400;
      text-decoration: none !important;
      position: relative;
    }

    .button-nav > ul > li > a > i {
      margin-right: 5px;
      width: 15px;
      display: inline-block;
      text-align: center;
      position: relative;
    }

    .button-nav > ul > li > a > span > em {
      font-size: 9px;
      display: block;
      padding: 2px;
      position: absolute;
      top: 6px;
      right: 36px;
      text-decoration: none;
      font-style: normal;
      background: #ddd;
      color: #333;
      min-width: 13px;
      border-radius: 50%;
      max-height: 13px;
      line-height: 8px;
      font-weight: 700;
      vertical-align: baseline;
      white-space: nowrap;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, .1);
    }

    .button-nav ul span.button-item-parent {
      display: inline-block;
      margin: 0;
      padding: 0;
    }

    .button-nav ul .active > a {
      color: #fff !important;
      position: relative;
    }

    .button-nav ul li.active > a:before {
      content: "\\f0d9";
      font-family: FontAwesome;
      display: block;
      height: 27px;
      line-height: normal;
      width: 27px;
      position: absolute;
      right: -21px;
      font-size: 20px;
      color: #eee;
    }

    .button-nav ul li a:hover {
      color: #fff
    }
  `]
})
export class DetaylibeyanButtonListComponent {

  @Input() idDetayliBeyan: number;
  @Input() detayliBeyan: any;
  @Input() curNav: string;
  private ihracatMenu = ['marka'];
  private ithalatMenu = ['vergi', 'kiymet', 'ozetbeyan'];

  constructor(private gtbUtils: GtbUtils) {

  }

  showButton(nav) {
    if (isNullOrUndefined(this.detayliBeyan)) return true;

    if (this.ihracatMenu.indexOf(nav) && this.gtbUtils.isIhracat(this.detayliBeyan.rejimKod)) {
      return true;
    }

    if (this.ithalatMenu.indexOf(nav) && this.gtbUtils.isIhracat(this.detayliBeyan.rejimKod)) {
      return false;
    }

  }

  private getNav(nav) {
    return '/detaylibeyan/' + nav + '?idDetayliBeyan=' + this.idDetayliBeyan;
  }

  private isActive(nav) {
    return nav == this.curNav;
  }

}
