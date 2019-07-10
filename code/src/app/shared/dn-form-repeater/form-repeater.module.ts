import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnInputModule, DnSelect2Module, DnWidgetsModule } from '@dinazor/core';
import { DnFormRepeaterComponent } from './form-repeater.component';

@NgModule({
  imports: [
    CommonModule,
    DnWidgetsModule,
    ReactiveFormsModule,
    DnSelect2Module,
    DnInputModule
  ],
  // declarations: [DnFormRepeaterComponent],
  // exports: [DnFormRepeaterComponent]
})
export class DnFormRepeaterModule {
}
