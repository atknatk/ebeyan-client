import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DnHttpService, DnLoadingBase, DnNotificationService, isNullOrUndefined } from '@dinazor/core';
import { gtbConst } from '../../gtb/gtb-const';

@Component({
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css']
})
export class FaturaComponent extends DnLoadingBase implements OnInit {
  baseForm: FormGroup;
  gtbConst = gtbConst;

  constructor(private _fb: FormBuilder,
              private _http: DnHttpService<any>,
              private _nf: DnNotificationService) {
    super();
  }

  get id(): number {
    return this.baseForm.get('id').value;
  }

  get isEdit() {
    return this.id !== 0;
  }

  ngOnInit(): void {
    this.loadUsers();
    this.baseForm = this._fb.group({
      id: [0]
    });
  }

  onRemove() {
    this._nf.removeConfirm(() => this._http.delete('FaturaKullanici', this.id));
  }

  onReset() {
    this.baseForm.reset({id: this.id});
  }

  onSubmit() {
    if (this.isEdit) {
      this.onEdit();
    } else {
      this.onSave();
    }
  }

  private loadUsers() {
    this._http.get('FaturaKullanici/Current').subscribe(res => {
      if (res.isSuccess) {
        if (!isNullOrUndefined(res.data)) {
          this.baseForm.patchValue(res.data);
        }
      } else {
        this._nf.showDinazorResultMessage(res);
      }
    });
  }

  private onEdit() {
    this._http.put(this.baseForm.getRawValue(), 'FaturaKullanici').subscribe(res => {
      this._nf.showDinazorResultMessage(res);
    });
  }

  private onSave() {
    this._http.post(this.baseForm.getRawValue(), 'FaturaKullanici').subscribe(res => {
      this._nf.showDinazorResultMessage(res);
      if (res.isSuccess) {
        this.baseForm.patchValue({id: res.objectId});
      }
    });
  }
}
