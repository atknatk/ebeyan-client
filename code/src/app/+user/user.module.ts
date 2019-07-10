import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DnUserModule, DnWidgetsModule } from '@dinazor/core';
import { UserComponent } from './user.component';
import { userRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    userRouting,
    ReactiveFormsModule,
    DnUserModule,
    DnWidgetsModule
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule {
}
