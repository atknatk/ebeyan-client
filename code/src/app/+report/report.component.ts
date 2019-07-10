import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  template: `
    <div id="content">
      <section id="widget-grid" class="">
        <div class="well well-sm">
          <div class="input-group">
            <select class="form-control input-lg" placeholder="Search for an icon...">
              <option value="1">Gtip Listesi</option>
            </select>
            <span class="input-group-addon"><i class="fa fa-fw fa-lg fa-search"></i></span>
          </div>
        </div>
      </section>
    </div>`
})
export class ReportComponent {

  constructor(private http: HttpClient) {
    this.login();
  }

  login() {
    let enco: any = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.get('report/rest/login?j_username=jasperadmin&j_password=jasperadmin').subscribe(res => {

    });

  }

}
