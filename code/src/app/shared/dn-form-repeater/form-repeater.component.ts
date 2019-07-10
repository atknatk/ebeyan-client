import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from '@dinazor/core';

declare let $: any;

@Component({
  selector: 'dn-form-repeater',
  templateUrl: './form-repeater.component.html'
})
export class DnFormRepeaterComponent {
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

    @Input() showHeader = true;
    @Input() headerTitle = '';
    @Input() cssClass = 'col-sm-12 col-md-12 col-lg-12';
    @Input() form: FormGroup;
    @Input() dnFormArrayName: string;
    private formArray: FormArray;


    constructor(private _fb: FormBuilder) {
      this.initForm();
    }

    ngOnInit(): void {
      this.initForm();
    }
    addChild() {
      this.getControl().push(
        new FormGroup({
          test: new FormControl(null)
        })
      );
    }
    private initForm() {
      if (!isNullOrUndefined(this.form) && !isNullOrUndefined(this.dnFormArrayName)) {
        this.formArray = this._fb.array([]);
        this.form.addControl(this.dnFormArrayName, this.formArray);
      }
    }


    private getControl(): FormArray {
      return this.form.controls[this.dnFormArrayName] as FormArray;
    }


}
