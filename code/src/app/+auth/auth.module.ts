import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DnLoadingModule } from '@dinazor/core';
import { AuthComponent } from './auth.component';

import { routing } from './auth.routing';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    DnLoadingModule
  ],
  exports: [],
  declarations: [AuthComponent],
})
export class AuthModule {
}
