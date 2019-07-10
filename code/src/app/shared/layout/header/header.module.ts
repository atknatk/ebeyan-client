import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DnLogoutConfigService } from '@dinazor/core';
import { DnLogoutModule } from '@dinazor/core/release/views/auth/logout/logout.module';
import { BsDropdownModule } from 'ngx-bootstrap';

import { PopoverModule } from 'ngx-popover';

import { UtilsModule } from '../../utils/utils.module';
import { ActivitiesMessageComponent } from './activities/activities-message/activities-message.component';
import { ActivitiesNotificationComponent } from './activities/activities-notification/activities-notification.component';
import { ActivitiesTaskComponent } from './activities/activities-task/activities-task.component';

import { ActivitiesComponent } from './activities/activities.component';

import { CollapseMenuComponent } from './collapse-menu/collapse-menu.component';
import { FullScreenComponent } from './full-screen/full-screen.component';
import { HeaderComponent } from './header.component';
import { RecentProjectsComponent } from './recent-projects/recent-projects.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    UtilsModule, PopoverModule,
    DnLogoutModule.forRoot({})
  ],
  declarations: [
    FullScreenComponent,
    CollapseMenuComponent,
    HeaderComponent,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [DnLogoutConfigService]
})
export class HeaderModule {
}
