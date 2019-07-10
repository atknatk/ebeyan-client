import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DnHttpService, DnInputComponent, DnNotificationService, DnSelect2Item, Guid } from '@dinazor/core';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { gtbConst } from '../../gtb/gtb-const';
import { NotificationService } from '../../shared/utils/notification.service';

/**
 * Created by cabbar on 03.05.2017.
 */

declare let $: any;

@Component({
  selector: 'app-ncts',
  templateUrl: './ncts.component.html',
  styleUrls: ['./ncts.component.css']
})
export class NctsComponent implements OnInit, AfterViewInit {


  nctsForm: FormGroup;
  gtbConst = gtbConst;
  idNcts: number = NaN;
  private defaultBildirim;
  private url: string = 'Ncts';
  @ViewChild('inputcikisulkesi') private inputCikisUlke: DnInputComponent;
  @ViewChild('inputgidecegiulkesi') private inputGidecegiUlke: DnInputComponent;

  constructor(private _fb: FormBuilder,
              private dnHttp: DnHttpService<any>,
              private notificationService: DnNotificationService,
              private route: ActivatedRoute) {
    this.initForm();

  }

  get isEdit() {
    return this.nctsForm.get('id').value != 0;
  }

  get refId() {
    return this.nctsForm.get('refId').value;
  }

  cikisRemove() {
    this.inputCikisUlke.value = null;
  }

  cikisSelect(item: DnSelect2Item) {
    this.inputCikisUlke.value = item.name;
  }

  gidecegiRemove() {
    this.inputGidecegiUlke.value = null;
  }

  gidecegiSelect(item: DnSelect2Item) {
    this.inputGidecegiUlke.value = item.name;
  }

  initForm() {
    this.nctsForm = this._fb.group({});
    this.nctsForm.addControl('id', new FormControl(0));
    this.nctsForm.addControl('isTankerDurumu', new FormControl(false));
    this.nctsForm.addControl('refId', new FormControl(null));
  }

  ngAfterViewInit(): void {
    this.afterInit();
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

  private afterInit() {
    this.initTemporaryTescilNoOrDetayliBeyan();
  }

  private editData() {
    let val = this.nctsForm.getRawValue();
    this.dnHttp.put(val, 'nctsBeyan').subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
    });
  }

  private initTemporaryTescil() {
    let tescilNo;
    this.dnHttp.get('TemporaryTransaction/Ncts').subscribe(res => {
      if (res.isSuccess) {
        tescilNo = res.data + '';
      } else {
        tescilNo = Guid.newGuid();
      }
      this.nctsForm.patchValue({refId: tescilNo});
    });
  }

  private initTemporaryTescilNoOrDetayliBeyan() {
    this.route
      .queryParams
      .subscribe(params => {
        let idNcts = +params['idNctsBeyan'] || NaN;
        if (isNaN(idNcts)) {
          this.initTemporaryTescil();
        } else {
          this.loadData(idNcts);
        }
      });
  }

  private loadData(idDetayliBeyan: number) {
    this.dnHttp.get('nctsbeyan/' + idDetayliBeyan).subscribe(res => {
      if (res.isSuccess) {
        this.nctsForm.patchValue(res.data);
      }
    });
  }

  private saveData() {
    let val = this.nctsForm.getRawValue();
    this.dnHttp.post(val, 'nctsBeyan').subscribe(res => {
      this.notificationService.showDinazorResultMessage(res);
    });
  }


}
