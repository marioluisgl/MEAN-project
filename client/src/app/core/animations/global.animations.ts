import {trigger, query, style, animate, transition} from '@angular/animations';

export const globalAnimation = [
  trigger('enterOpacity', [
    transition(':enter', [
      // style base
      query(':self', style({opacity: 0})),
      // animate
      query(':self', animate(500, style({opacity: 1}))),
    ]),
    transition(':leave', [
      // style base
      query(':self', style({opacity: 1})),
      // animate
      query(':self', animate(0, style({opacity: 0}))),
    ])
  ]),
  trigger('enterText', [
    transition(':enter', [
      // style base
      query(':self', style({opacity: 0})),
      // animate
      query(':self', animate(500, style({opacity: 1}))),
    ]),
    transition(':leave', [
      // style base
      query(':self', style({opacity: 1})),
      // animate
      query(':self', animate(200, style({opacity: 0}))),
    ])
  ]),
];


export const formAnimation = [
  trigger('enterRightForm', [
    transition(':enter', [
      // style base
      query(':self', style({transform: 'translateX(100%)', opacity: 0})),
      // animate
      query(':self', animate(800, style({transform: 'translateX(0%)', opacity: 1}))),
    ]),
    transition(':leave', [
      // style base
      query(':self', style({transform: 'translateX(0)', opacity: 1})),
      // animate
      query(':self', animate(0, style({transform: 'translateX(100%)' , opacity: 0}))),
    ])
  ]),
];
