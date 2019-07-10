/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnLoadingBase, DnNotificationService } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { GtbSelectItem } from '../model/gtb-select-item-base';


@Component({
  templateUrl: './teminat.component.html',
  styleUrls: ['./teminat.component.css']
})
export class DetaylibeyanTeminatComponent extends DnLoadingBase implements OnInit {


  dbTeminatForm: FormGroup;
  idDetayliBeyan: number;
  gtbConst = gtbConst;
  formArrName = 'detayliBeyanTeminatList';

  constructor(private _fb: FormBuilder,
              private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private route: ActivatedRoute) {
    super();
  }

  addSatir() {
    this.getControl().push(this.initTeminat());
  }

  getControl(): FormArray {
    return <FormArray>this.dbTeminatForm.controls[this.formArrName];
  }

  getValue(i?: number): any {
    if (!isNaN(+i)) {
      return this.getControl().value[i];
    }
    return this.getControl().value;
  }

  initTeminat(teminat?: any) {
    if (teminat) {
      return this._fb.group({
        teminatSekli: [teminat.teminatSekli, Validators.required],
        teminatOrani: [teminat.teminatOrani, Validators.required],
        bankaMektubuTutari: [teminat.bankaMektubuTutari],
        nakdiTeminatTutari: [teminat.nakdiTeminatTutari, Validators.required],
        digerTutar: [teminat.digerTutar, Validators.required],
        globalTeminatNo: [teminat.globalTeminatNo, Validators.required],
        aciklama: [teminat.aciklama, Validators.required],
        digerTutarReferansi: [teminat.digerTutarReferansi, Validators.required],
        idDetayliBeyan: [teminat.idDetayliBeyan, Validators.required],
        id: [teminat.id]
      });
    } else {
      return this._fb.group({
        teminatSekli: [null, Validators.required],
        teminatOrani: [null, Validators.required],
        bankaMektubuTutari: [null],
        nakdiTeminatTutari: [null],
        digerTutar: [null],
        globalTeminatNo: [null],
        aciklama: [null],
        digerTutarReferansi: [null],
        idDetayliBeyan: [this.idDetayliBeyan],
        id: [0]
      });

    }
  }

  loadTeminat() {
    this.dnHttp.get('detaylibeyan/' + this.idDetayliBeyan + '/teminat', this.loadingContext()).subscribe(res => {
      if (res.isSuccess) {
        res.data.forEach(teminat => {
          this.getControl().push(this.initTeminat(teminat));
        });
      } else {
        this.notificationService.showDinazorResultMessage(res);
      }
    });
  }

  ngOnInit() {
    this.dbTeminatForm = this._fb.group({
      detayliBeyanTeminatList: this._fb.array([])
    });
    this.initDetayliBeyanId();
  }

  onSubmit() {
    return this.dnHttp.post(this.getValue(), 'DetaylibeyanTeminat/List', this.loadingContext())
      .subscribe(this.notificationService.subscribeMessage.bind(this.notificationService));
  }

  removeDokuman(i: number) {
    let val = this.getValue(i);
    if (val && val.id) {
      this.notificationService.removeConfirm(() => {
        return this.dnHttp.delete('DetaylibeyanTeminat', val.id);
      }, this.getControl().removeAt.bind(this.getControl()));
    } else {
      this.getControl().removeAt(i);
    }
  }

  removeSatir(i: number) {
    this.removeDokuman(i);
  }

  private initDetayliBeyanId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        this.loadTeminat();
      });
  }


}

