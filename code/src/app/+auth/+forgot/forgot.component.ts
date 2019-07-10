import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent{


  constructor(private router: Router) {
  }



  submit(event) {
    event.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}
