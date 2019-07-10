import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnInputModule, DnSelect2Module, DnWidgetsModule } from '@dinazor/core';
// import { HighchartsModule } from '../shared/chart/highcharts.module';
import { DnFormRepeaterModule } from '../shared/dn-form-repeater/form-repeater.module';
import { HomeComponent } from './home.component';
import { homeRouting } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    DnInputModule,
    DnSelect2Module,
    ReactiveFormsModule,
    DnSelect2Module,
    DnInputModule,
    DnWidgetsModule,
    DnFormRepeaterModule,
    // HighchartsModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
