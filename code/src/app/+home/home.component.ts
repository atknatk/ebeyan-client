import { Component } from '@angular/core';
import { DnHttpService } from '@dinazor/core';

declare let $: any;

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private _http: DnHttpService<any>) {
    /*this._http.get('http://www.mevzuat.net/rss.aspx?f=s').subscribe(res => {
      const doc = new XMLDocument();
      // doc.LoadXml(xml);
      // string jsonText = JsonConvert.SerializeXmlNode(doc);
    });*/
  }

}
