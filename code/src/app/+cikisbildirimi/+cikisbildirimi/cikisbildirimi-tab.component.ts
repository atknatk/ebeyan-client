import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DnLoadingBase, isNullOrUndefinedOrEmpty } from '@dinazor/core';
import { Subscription } from 'rxjs/Subscription';
import { OzetbeyanComponent } from '../../gtb/shared/ozetbeyan/+ozetbeyan/ozetbeyan.component';
import { OzetbeyanTasimaSenetComponent } from '../../gtb/shared/ozetbeyan/+tasima-senet/ozetbeyan-tasima-senet.component';
import { beyanConfig } from '../../gtb/shared/ozetbeyan/ozetbeyan-shared.config';

declare let $: any;

@Component({
  templateUrl: './cikisbildirimi-tab.component.html',
  styles: [`
    .li-disabled {
      /* pointer-events: none;*/
      /* opacity: 0.6;*/
    }

    .li-tooltip {
      position: relative;
      display: inline-block;

    }

    .li-tooltip-text:after {
      content: '';
      position: absolute;
    }

    .li-tooltip .li-tooltip-text {
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      /*left: -9999px;*/
      padding: 2px 8px 3px;
      font-size: 11px;
      line-height: 16px;
      font-weight: 400;
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      opacity: 0;
      transition: margin 0.3s, opacity 0.3s;
      -o-transition: margin 0.3s, opacity 0.3s;
      -ms-transition: margin 0.3s, opacity 0.3s;
      -moz-transition: margin 0.3s, opacity 0.3s;
      -webkit-transition: margin 0.3s, opacity 0.3s;
    }

    .li-tooltip.li-disabled:hover .li-tooltip-text {
      opacity: 1;
      right: 0;
      left: auto;
      margin-top: 10px;
    }

    .li-tooltip .tooltip-bottom-right {
      top: 100%;
      margin-top: 20px;
    }

    .li-tooltip .tooltip-bottom-right:after {
      bottom: 100%;
      right: 11px;
      border-right: 4px solid transparent;
      border-bottom: 4px solid rgba(0, 0, 0, 0.9);
      border-left: 4px solid transparent;
    }
  `]
})
export class CikisbildirimiTabComponent extends DnLoadingBase implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('ozetbeyan') ozetbeyanComponent: OzetbeyanComponent;
  @ViewChild('tasimasenet') tasimaSenetComponent: OzetbeyanTasimaSenetComponent;
  beyanConfig = beyanConfig;
  ozetbeyanData: any;
  idOzetbeyan: number = NaN;
  beyanTuruCode: string;
  isOzetbeyanEditing: boolean = false;
  private sub: Subscription;

  constructor(private _route: ActivatedRoute) {
    super();
  }

  beyanTuruChangedEvent(data) {
    this.beyanTuruCode = data;
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      const id: string = params['id'];
      if (!isNullOrUndefinedOrEmpty(id)) {
        this.idOzetbeyan = +id;
      }
      this.ozetbeyanComponent.beyanType = beyanConfig.cikisbildirimi;
      this.ozetbeyanComponent.loadData(this.idOzetbeyan);
      if (this.tasimaSenetComponent) {
        this.tasimaSenetComponent.beyanType = beyanConfig.cikisbildirimi;
        this.tasimaSenetComponent.loadData(this.idOzetbeyan);
      }
    });
  }

  ozetbeyanEditing(data) {
    this.isOzetbeyanEditing = data;
  }

  saveOzetbeyanEvent(data: any) {
    if (this.tasimaSenetComponent) {
      this.tasimaSenetComponent.beyanType = beyanConfig.cikisbildirimi;
      this.tasimaSenetComponent.loadData(data.id);
    }
    this.ozetbeyanData = data;
  }

}
