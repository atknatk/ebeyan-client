import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { config, DnHttpService, DnLoadingBase, DnNotificationService, DnStorageService } from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';

@Component({
  templateUrl: './gtb-user.component.html',
  styleUrls: ['./gtb-user.component.css']
})
export class GtbUserComponent extends DnLoadingBase implements OnInit {
  baseForm: FormGroup;
  users: any[] = [];
  selectedRow: number = NaN;
  gtbConst = gtbConst;

  constructor(private _fb: FormBuilder,
              private _http: DnHttpService<any>,
              private _storage: DnStorageService,
              private _nf: DnNotificationService) {
    super();
  }

  get isEdit() {
    return !isNaN(this.selectedRow);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.baseForm = this._fb.group({
      id: [0]
    });
  }

  onRemove(id) {
    this._nf.removeConfirm(() => this._http.delete('gtbuser', id), this.loadUsers.bind(this));
  }

  onSubmit() {
    if (this.isEdit) {
      this.onEdit();
    } else {
      this.onSave();
    }
  }

  reset() {
    for (const prop  in this.baseForm.controls) {
      if (this.baseForm.controls.hasOwnProperty(prop)) {
        // this.baseForm.get(prop).reset({id: 0});
      }
    }
    this.baseForm.reset({id: 0});
    // this.fields().forEach(field => {
    //   let fieldForm: FormGroup = <FormGroup>this.baseForm.get(field.key);
    //   if (fieldForm) {
    //     fieldForm.reset();
    //   }
    // });
  }

  setClickedRow(index) {
    if (this.selectedRow == index) {
      this.resetTable();
    } else {
      this.selectedRow = index;
      this.loadRowValueToForm(index);
    }
  }


  private loadRowValueToForm(i: number): void {
    let val = this.users[i];
    this.baseForm.patchValue(val);
  }

  private loadUsers() {
    this._http.get('GtbUser').subscribe(res => {
      if (res.isSuccess) {
        this.users = res.data;
      } else {
        this._nf.showDinazorResultMessage(res);
      }
    });
  }

  private onEdit() {
    const val = this.baseForm.getRawValue();
    val.updatePassword = val.bilgeSifre != this.users[this.selectedRow].bilgeSifre;
    this._http.put(val, 'GtbUser').subscribe(res => {
      this.loadUsers();
      this._nf.showDinazorResultMessage(res);
      this.setLocalStorage(this._storage.getItem(config.DINAZOR_USER_KEY));
    });
  }

  private onSave() {
    this._http.post(this.baseForm.getRawValue(), 'GtbUser').subscribe(res => {
      this.loadUsers();
      this._nf.showDinazorResultMessage(res);
      this.setLocalStorage(this._storage.getItem(config.DINAZOR_USER_KEY));
    });
  }

  private resetTable() {
    this.selectedRow = NaN;
    this.reset();
  }

  private setLocalStorage(data: any) {
    this._http.get('Gtbuser/' + data.id + '/User').subscribe(res => {
      if (res.isSuccess) {
        this._storage.removeItem(gtbConst.gtbUserKey);
        this._storage.setItem(gtbConst.gtbUserKey, res.data);
      }
    });
  }
}
