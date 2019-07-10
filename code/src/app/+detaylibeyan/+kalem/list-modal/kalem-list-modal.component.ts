import { Component, ViewChild } from '@angular/core';
import { IDictionary, isNullOrUndefined } from '@dinazor/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DetayliBeyanKalemModel } from '../../../+model/detaylibeyan/detaylibeyan-kalem.model';

declare let $: any;

@Component({
  selector: 'db-kalem-list',
  templateUrl: './kalem-list-modal.component.html',
  styles: [`
    .kalem-list-modal {
      overflow-y: auto !important;
      height: calc(100vh - 150px);
    }
  `]
})
export class KalemListModalComponent {

  private modalRef: BsModalRef;
  @ViewChild('kalemListTemplate') kalemListTemplate;
  private kalemList: DetayliBeyanKalemModel[];
  private editAction: (_: string) => void;

  constructor(private modalService: BsModalService) {
  }

  setEditActionCallback(fn: (_: string) => void) {
    this.editAction = fn;
  }

  editKalem(kalemNo) {
    this.modalRef.hide();
    if (!isNullOrUndefined(this.editAction)) {
      this.editAction(kalemNo);
    }
  }

  hide() {
    this.modalRef.hide();
  }

  show(kalemList: IDictionary) {
    this.kalemList = [];
    kalemList.keys().forEach(keys => this.kalemList.push(kalemList.get(keys)))
    this.modalRef = this.modalService.show(this.kalemListTemplate);
  }

}
