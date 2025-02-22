import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  _state: InternalStateType = {};
  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}


@Injectable()
export class AppReadyEvent {
  private doc: Document;
  private isAppReady: boolean;
  private customEvent;

  constructor(@Inject(DOCUMENT) doc: any) {
    this.doc = doc;
    this.isAppReady = false;
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // Trigger the "appready" event.
  // --
  // NOTE: In this particular implementation of this service on this PLATFORM, this
  // simply triggers the event on the DOM (Document Object Model); however, one could
  // easily imagine this event being triggered on an Observable or some other type of
  // message transport that makes more sense for a different platform. Nothing about
  // the DOM-interaction leaks outside of this service.
  public trigger(): void {
    // If the app-ready event has already been triggered, just ignore any subsequent
    // calls to trigger it again.
    if (this.isAppReady) {
      return;
    }

    const bubbles = true;
    const cancelable = false;

    this.doc.dispatchEvent(this.createEvent('appready', bubbles, cancelable));
    this.isAppReady = true;
  }

  // ---
  // PRIVATE METHODS.
  // ---

  // Create and return a custom event with the given configuration.
  private createEvent(eventType: string, bubbles: boolean, cancelable: boolean): Event {
    // IE (shakes fist) uses some other kind of event initialization. As such,
    // we'll default to trying the "normal" event generation and then fallback to
    // using the IE version.

    try {
      this.customEvent = new CustomEvent(
        eventType,
        {
          bubbles,
          cancelable
        }
      );
    } catch (error) {
      this.customEvent = this.doc.createEvent('CustomEvent');
      this.customEvent.initCustomEvent(eventType, bubbles, cancelable);
    }

    return (this.customEvent);
  }
}
