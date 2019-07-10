import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnNotificationService } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';

/**
 * Created by cabbar on 03.05.2017.
 */

declare let $: any;

@Component({
  templateUrl: './hareket.component.html',
  styleUrls: ['./hareket.component.css']
})
export class NctsHareketComponent implements OnInit, AfterViewInit {

  nctsForm: FormGroup;
  idNctsBeyan: number = NaN;
  gtbConst = gtbConst;
  private defaultBildirim;
  private url: string = 'NctsHareketYaniti';

  constructor(private _fb: FormBuilder,
              private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private route: ActivatedRoute) {
    this.initForm();
    this.getNctsId();
  }

  get isEdit() {
    return this.nctsForm.get('id').value > 0;
  }

  initForm() {
    this.nctsForm = this._fb.group({});
    this.nctsForm.addControl('id', new FormControl(0));
    this.nctsForm.addControl('idNctsBeyan', new FormControl(0));
  }

  ngAfterViewInit(): void {
    if (isNaN(this.idNctsBeyan)) {
      this.notificationService.showWarning('Ncts Beyanname Seçilmedi. Çıkıp tekrar deneyiniz!!');
    } else {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.defaultBildirim = this.nctsForm.getRawValue();
  }

  onSubmit() {
    if (this.isEdit) {
      this.editData();
    } else {
      this.saveData();
    }
  }

  private editData() {
    let val = this.nctsForm.getRawValue();
    this.dnHttp.put(val, this.url).subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  private getNctsId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idNctsBeyan = +params['idNctsBeyan'] || NaN;
        this.nctsForm.patchValue({idNctsBeyan: this.idNctsBeyan});
      });
  }

  private loadData() {
    this.dnHttp.get('nctsbeyan/' + this.idNctsBeyan + '/NctsHareketYaniti').subscribe(res => {
      if (res.isSuccess) {
        this.nctsForm.patchValue(res.data);
      }
    });
  }

  private saveData() {
    let val = this.nctsForm.getRawValue();
    this.dnHttp.post(val, this.url).subscribe(res => {
      if (res.isSuccess) {
        this.nctsForm.patchValue({id: res.objectId});
      }
      this.notificationService.showDinazorResultMessage(res);
    });
  }

}
