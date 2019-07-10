import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DetayliBeyanKalemModel } from '../../../+model/detaylibeyan/detaylibeyan-kalem.model';
import { FirmaComponent } from './firma.component';

declare let $: any;

@Component({
  selector: 'firma-modal',
  template: `
    <ng-template #firmaModalTemplate>
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" (click)="hide()" aria-hidden="true">
          <i class="fa fa-times fa-lg"></i>
        </button>
        <h4 class="modal-title">Firma İşlemleri</h4>
        <!--<small class="font-bold">{{datatableData.userId}} : {{datatableData.name}}
        </small>-->
      </div>

      <div class="modal-body kalem-list-modal">
        <gtb-tanimlamalar-firma #firmaComponent></gtb-tanimlamalar-firma>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-white" (click)="hide()" data-dismiss="modal">Kapat</button>
      </div>
    </ng-template>

  `,
  styles: [`
    .kalem-list-modal {
      overflow-y: auto !important;
      height: calc(100vh - 150px);
    }
  `]
})
export class FirmaModalComponent {

  private modalRef: BsModalRef;
  @Output('hideEvent') hideEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('firmaModalTemplate') firmaModalTemplate;
  @ViewChild('firmaComponent') firmaComponent: FirmaComponent;

  constructor(private modalService: BsModalService) {
  }

  hide() {
    this.modalRef.hide();
    this.hideEvent.emit();
  }

  show() {
    this.modalRef = this.modalService.show(this.firmaModalTemplate);
    setTimeout(() => {
      if (this.firmaComponent)
        this.firmaComponent.crudComponent.openNewDataPanel();
    }, 500);
  }

}
