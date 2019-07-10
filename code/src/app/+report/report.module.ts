import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { reportRouting } from './report.routing';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    reportRouting
  ],
  declarations: [ReportComponent],
  providers: []
})
export class ReportModule {
}
