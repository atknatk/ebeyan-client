/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, ViewChild } from '@angular/core';
import { GtbSelectItem } from '../model/gtb-select-item-base';
import { ActivatedRoute } from '@angular/router';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { NctsDetayTeminatComponent } from './teminat/teminat.component';
import { DnNotificationService } from '@dinazor/core';


@Component({
  templateUrl: './ncts-detay.component.html',
  styleUrls: ['./ncts-detay.component.css']
})
export class NctsDetayComponent {

  private idNctsBeyan: number = NaN;
  @ViewChild('teminat') private teminat: NctsDetayTeminatComponent;


  constructor(private activatedRoute: ActivatedRoute,
              private notificationService: DnNotificationService) {

  }

  private getIdNctsBeyan() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.idNctsBeyan = +params['idNctsBeyan'] || NaN;
        if (isNaN(this.idNctsBeyan)) {
          this.notificationService.showWarning('Ncts Beyanname Seçilmedi. Çıkıp tekrar deneyiniz!!');
          return;
        }
        this.teminat.setNctsBeyanId(this.idNctsBeyan);
      });
  }

}
