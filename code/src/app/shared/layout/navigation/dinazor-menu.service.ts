import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { gtbRoles } from '../../../gtb/gtb-role-enum';

@Injectable()
export class DinazorMenuService {


  public menuList = [];


  getMenuList() {

    return this.menuList =
      [
        {
          'label': 'Anasayfa',
          'route': '/home',
          'icon': 'fa fa-lg fa-fw fa-home',
          'title': 'Anasayfa',
          roles: [-1]
        },
        {
          'label': 'Özet Beyan',
          'route': '#',
          'icon': 'fa fa-lg fa-fw fa-file-text',
          'title': 'Özet Beyan',
          roles: [
            gtbRoles.OzetBeyanSave,
            gtbRoles.OzetBeyanUpdate,
            gtbRoles.OzetBeyanView,
            gtbRoles.OzetBeyanTescil
          ],
          'childrens': [
            {
              'label': 'Özet Beyan',
              'route': '/ozetbeyan/ozetbeyan',
              'icon': 'fa fa-file-text',
              'title': 'Özet Beyan',
              roles: [
                gtbRoles.OzetBeyanSave,
                gtbRoles.OzetBeyanUpdate
              ]
            },
            {
              'label': 'Özet Beyan Liste',
              'route': '/ozetbeyan/ozetbeyan-list',
              'icon': 'fa fa-list-alt',
              'title': 'Özet Beyan Liste',
              roles: [
                gtbRoles.OzetBeyanUpdate,
                gtbRoles.OzetBeyanView,
                gtbRoles.OzetBeyanTescil
              ]
            }
          ]
        },
        {
          'label': 'Varış Bildirimi',
          'route': '#',
          'icon': 'fa fa-lg fa-fw fa-plane rotate-180',
          'title': 'Varış Bildirimi',
          roles: [
            gtbRoles.OzetBeyanSave,
            gtbRoles.OzetBeyanUpdate,
            gtbRoles.OzetBeyanView,
            gtbRoles.OzetBeyanTescil
          ],
          'childrens': [
            {
              'label': 'Varış Bildirimi',
              'route': '/varisbildirimi/varisbildirimi',
              'icon': 'fa fa-lg fa-fw fa-plane rotate-180',
              'title': 'Varış Bildirimi',
              roles: [
                gtbRoles.OzetBeyanSave,
                gtbRoles.OzetBeyanUpdate
              ]
            },
            {
              'label': 'Varış Bildirimi Liste',
              'route': '/varisbildirimi/varisbildirimi-list',
              'icon': 'fa fa-list-alt',
              'title': 'Varış Bildirimi Liste',
              roles: [
                gtbRoles.OzetBeyanUpdate,
                gtbRoles.OzetBeyanView,
                gtbRoles.OzetBeyanTescil
              ]
            }
          ]
        }, {
        'label': 'Çıkış Bildirimi',
        'route': '#',
        'icon': 'fa fa-lg fa-fw fa-plane',
        'title': 'Çıkış Bildirimi',
        roles: [
          gtbRoles.OzetBeyanSave,
          gtbRoles.OzetBeyanUpdate,
          gtbRoles.OzetBeyanView,
          gtbRoles.OzetBeyanTescil
        ],
        'childrens': [
          {
            'label': 'Çıkış Bildirimi',
            'route': '/cikisbildirimi/cikisbildirimi',
            'icon': 'fa fa-lg fa-fw fa-plane', 'title': 'Çıkış Bildirimi',
            roles: [
              gtbRoles.OzetBeyanSave,
              gtbRoles.OzetBeyanUpdate
            ]
          },
          {
            'label': 'Çıkış Bildirimi Liste',
            'route': '/cikisbildirimi/cikisbildirimi-list',
            'icon': 'fa fa-list-alt',
            'title': 'Çıkış Bildirimi Liste',
            roles: [
              gtbRoles.OzetBeyanUpdate,
              gtbRoles.OzetBeyanView,
              gtbRoles.OzetBeyanTescil
            ]
          }
        ]
      },
        {
          'label': 'TCGB',
          'route': '#',
          'icon': 'fa fa-lg fa-fw fa-files-o',
          'title': 'Detaylı Beyan',
          roles: [
            gtbRoles.DetayliBeyanSave,
            gtbRoles.DetayliBeyanUpdate,
            gtbRoles.DetayliBeyanView,
            gtbRoles.DetayliBeyanTescil
          ],
          'childrens': [
            {
              'label': 'Yeni TCGB',
              'route': '/detaylibeyan/detaylibeyan',
              'icon': 'fa fa-files-o',
              'title': 'Detaylı Beyan',
              roles: [
                gtbRoles.DetayliBeyanSave,
                gtbRoles.DetayliBeyanUpdate
              ]
            },
            {
              'label': 'TCGB Liste',
              'route': '/detaylibeyan/detaylibeyan-list',
              'icon': 'fa fa-list-alt',
              'title': 'Detaylı Beyan Liste',
              roles: [
                gtbRoles.DetayliBeyanUpdate,
                gtbRoles.DetayliBeyanView,
                gtbRoles.DetayliBeyanTescil
              ],
            }
          ]
        },
        {
          'label': 'NCTS',
          'route': '#',
          'icon': 'fa fa-lg fa-fw fa-truck',
          'title': 'Detaylı Beyan',
          roles: [
            gtbRoles.NctsSave,
            gtbRoles.NctsUpdate,
            gtbRoles.NctsView,
          ],
          'childrens': [
            {
              'label': 'NCTS',
              'route': '/ncts/ncts',
              'icon': 'fa fa-truck',
              'title': 'Detaylı Beyan',
              roles: [
                gtbRoles.NctsSave,
                gtbRoles.NctsUpdate
              ]
            },
            {
              'label': 'NCTS Liste',
              'route': '/ncts/ncts-list',
              'icon': 'fa fa-list-alt',
              'title': 'Detaylı Beyan Liste',
              roles: [
                gtbRoles.NctsUpdate,
                gtbRoles.NctsView
              ],
            }
          ]
        },
        {
          'label': 'Rapor',
          'route': '/report',
          'icon': 'fa fa-lg fa-fw fa-bar-chart-o',
          'title': 'Raporlar',
          roles: [-1]
        },
        {
          'label': 'Kullanıcı',
          'route': '/kullanici',
          'icon': 'fa fa-lg fa-fw fa-user',
          'title': 'Kullanıcı',
          roles: [1, 2, 3, 4]
        },
        {
          'label': 'Tanımlamalar',
          'route': '#',
          'icon': 'fa fa-lg fa-fw fa-gears',
          'title': 'Tanımlamalar',
          roles: [gtbRoles.FirmaDelete, gtbRoles.FirmaUpdate, gtbRoles.FirmaSave,
            gtbRoles.GtbUserSave, gtbRoles.GtbUserUpdate, gtbRoles.GtbUserView, gtbRoles.GtbUserDelete],
          'childrens': [
            {
              'label': 'Firma',
              'route': '/tanimlamalar/firma',
              'icon': 'fa fa-building',
              'title': 'Firma  Tanımlamaları',
              roles: [gtbRoles.FirmaDelete, gtbRoles.FirmaUpdate, gtbRoles.FirmaSave]
            },
            {
              'label': 'Gümrük Kullanıcı',
              'route': '/tanimlamalar/gtbuser',
              'icon': 'fa fa-user',
              'title': 'Gümrük Kullanıcı Tanımlamaları',
              roles: [gtbRoles.GtbUserSave, gtbRoles.GtbUserUpdate, gtbRoles.GtbUserView, gtbRoles.GtbUserDelete]
            },
            {
              'label': 'E-Fatura',
              'route': '/tanimlamalar/efatura',
              'icon': 'fa fa-envelope',
              'title': 'E-Fatura Tanımlamaları',
              roles: [gtbRoles.GtbUserSave, gtbRoles.GtbUserUpdate, gtbRoles.GtbUserView, gtbRoles.GtbUserDelete]
            }
          ]
        }
      ];
  }
}
