import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from '../../user/login-info/login-info.component';
import {DinazorMenuService} from './dinazor-menu.service';


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(private dinazorMenuService: DinazorMenuService) {
  }

  ngOnInit() {
  }
  menu = this.dinazorMenuService.getMenuList();
}
