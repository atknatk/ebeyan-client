import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';

declare let $: any;

@Component({
  selector: 'sa-collapse-menu',
  templateUrl: './collapse-menu.component.html'
})
export class CollapseMenuComponent {

  constructor(
    private layoutService: LayoutService
  ) {

  }

  onToggle() {
    this.layoutService.onCollapseMenu()
  }
}
