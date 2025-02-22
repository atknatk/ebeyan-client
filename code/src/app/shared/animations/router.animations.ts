/**
 * Created by griga on 12/26/16.
 */

import { animate, state, style, transition, trigger } from '@angular/animations';


/* *****************************************\
 * Sliding Animations
 \* *****************************************/

export function slideToRight() {
  return trigger('slideToRight', [
    state('void', style({position: 'fixed', width: '100%'})),
    state('*', style({position: 'fixed', width: '100%'})),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

export function slideToLeft() {
  return trigger('slideToLeft', [
    state('void', style({position: 'fixed', width: '100%'})),
    state('*', style({position: 'fixed', width: '100%'})),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

export function slideToTop() {
  return trigger('slideToTop', [
    state('void', style({position: 'fixed', width: '100%', flex: '1'})),
    state('*', style({position: 'fixed', width: '100%', flex: '1'})),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

export function slideToBottom() {
  return trigger('slideToBottom', [
    state('void', style({position: 'fixed', width: '100%', flex: '1'})),
    state('*', style({position: 'fixed', width: '100%', flex: '1'})),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}

/* *****************************************\
 * Fading Animations
 \* *****************************************/

export function fadeInTop() {
  return trigger('fadeInTop', [
    state('void', style({opacity: '0'})),
    state('*', style({top: '0px', height: '100%', width: '100%', position: 'absolute'})),
    transition(':enter', [
      style({transform: 'translateY(10px)'}),
      animate('.5s 1s ease-in', style({
        transform: 'translateY(0)',
        opacity: '1'
      }))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0)'}),
      animate('.2s 1s ease-in', style({
        transform: 'translateY(10px)',
        opacity: '0'
      }))
    ])
  ]);
}

export function fadeInLeft() {
  return trigger('fadeInLeft', [
    state('void', style({opacity: '0', flex: '0 2', position: 'absolute'})),
    state('*', style({flex: '1 0', top: '0px'})),
    transition(':enter', [
      style({transform: 'translateX(10px)'}),
      animate('.5s ease-in', style({
        transform: 'translateX(0)',
        opacity: '1'
      }))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('.5s ease-out', style({
        transform: 'translateX(50px)',
        opacity: '0'
      }))
    ])
  ]);
}

/* *****************************************\
 * Fading Animations
 \* *****************************************/

export function fadeZoomInTop() {
  return trigger('fadeZoomInTop', [
    state('void', style({opacity: '0'})),

    state('*', style({top: '0px', height: '100%', width: '100%', position: 'absolute'})),
    // state('*', style({flex: '1'})),
    transition(':enter', [
      style({transform: 'translate3d(0, 10px, 0) '}),
      animate('0.5s ease-out', style({
        transform: 'translate3d(0, 0, 0)',
        opacity: '1'
      }))
    ]),
    transition(':leave', [
      style({transform: 'translate3d(0, 0, 0) '}),
      animate('0.2s ease-in', style({
        transform: 'translate3d(0, 40px, 0)',
        opacity: '0'
      }))
    ])
  ]);
}
