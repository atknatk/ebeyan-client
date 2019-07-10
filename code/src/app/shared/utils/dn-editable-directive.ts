import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

/**
 *
 */
@Directive({
  selector: '[contenteditableModel]'
})
export class ContenteditableModelDirective implements OnChanges {

  @Input('contenteditableModel')
  public model: any;

  @Output('contenteditableModelChange')
  public update = new EventEmitter();

  private _lastViewModel: any;

  constructor(private elRef: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if(this._lastViewModel !== changes['model'].currentValue){
      this._lastViewModel = this.model;
      this._refreshView();
    }
  }

  @HostListener('blur')
  public onBlur() {
    let value = this.elRef.nativeElement.innerText;
    this._lastViewModel = value;
    this.update.emit(value);
  }

  private _refreshView() {
    this.elRef.nativeElement.innerText = this.model;
  }
}
