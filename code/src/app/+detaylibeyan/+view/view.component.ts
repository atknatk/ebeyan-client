/**
 * Created by cabbar on 03.05.2017.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUser, DnHttpService, DnStorageService } from '@dinazor/core';
import { config } from '@dinazor/core/release/dinazor.config';
import 'inputmask/dist/inputmask/inputmask.extensions';
import { GtbSelectItem } from '../model/gtb-select-item-base';

declare let $: any;
declare let PDFJS: any;
declare let atob: any;

@Component({
  templateUrl: './view.component.html',
})
export class DetaylibeyanViewComponent implements OnInit {
  pdfSrc: string = ''; // 'pub/papers/google.pdf';
  page: number = 1;
  idDetayliBeyan;
  pdfHeight = (window.screen.height - 290) + 'px';
  readonly BASE64_MARKER = ';base64,';

  constructor(private dnStorageService: DnStorageService, private route: ActivatedRoute
    , private _http: DnHttpService<any>) {
    // this.getId();

  }

  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }


  /*  ngAfterViewInit(): void {
      const element = $(this._el.nativeElement);
      const canvas = element.find('canvas');
      canvas.css('width', '98%');
    }


    ngAfterContentInit(): void {
      const element = $(this._el.nativeElement);
      const canvas = element.find('canvas');
      canvas.css('width', '98%');
    }*/

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        this._http.get(`detaylibeyan/${this.idDetayliBeyan}/Rapor`).subscribe(res => {
          /*   const pdfAsDataUri = `data:application/pdf;base64,${res}`;
             const pdfAsArray = this.convertDataURIToBinary(pdfAsDataUri);
             PDFJS.getDocument(pdfAsArray).then(page => {
               const scale = 1.5;
               const viewport = page.getViewport(scale);

               // Prepare canvas using PDF page dimensions.
               const canvas: any = document.getElementById('the-canvas');
               const context = canvas.getContext('2d');
               canvas.height = viewport.height;
               canvas.width = viewport.width;

               // Render PDF page into canvas context.
               const renderContext = {
                 canvasContext: context,
                 viewport: viewport
               };
               page.render(renderContext);
             });
   */
          const pdfData = atob(res);
          const loadingTask = PDFJS.getDocument({data: pdfData});
          loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded');

            // Fetch the first page
            const pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
              console.log('Page loaded');

              const scale = 1.5;
              const viewport = page.getViewport(scale);

              // Prepare canvas using PDF page dimensions
              const canvas: any = document.getElementById('the-canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Render PDF page into canvas context
              const renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              const renderTask = page.render(renderContext);
              renderTask.then(function () {
                console.log('Page rendered');
              });
            });
          }, function (reason) {
            // PDF loading error
            console.error(reason);
          });

//          this.pdfSrc = `data:application/pdf;base64,${res}`;
        });
        // this.pdfSrc = location.protocol + '//' + location.hostname + ':' + location.port + '/api/Detaylibeyan/' + this.idDetayliBeyan + '/Rapor?token=' + user.token;
      });


  }

  print() {

    const canvas: any = document.getElementById('the-canvas');
    const win = window.open('', '', '');
    const html = `
<html>
<head>
<style type="text/css">

</style>
</head>
<body><img src="${canvas.toDataURL()}"></body>
</html>`;
    win.document.write(html);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
      win.close();
    }, 1000);

    /*const printContents = document.getElementsByClassName('page')[0].innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    //  const wnd = window.open(this.pdfSrc);
    //  wnd.print();
    // window.print();*/
  }

  private getId() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idDetayliBeyan = +params['idDetayliBeyan'] || NaN;
        let user: AuthUser = this.dnStorageService.getItem(config.DINAZOR_USER_KEY);
        this._http.get(`detaylibeyan/${this.idDetayliBeyan}/Rapor`).subscribe(res => {
          this.pdfSrc = `data:application/pdf;base64,${res}`;
        });

        // this.pdfSrc = location.protocol + '//' + location.hostname + ':' + location.port + '/api/Detaylibeyan/' + this.idDetayliBeyan + '/Rapor?token=' + user.token;
      });
  }
}

