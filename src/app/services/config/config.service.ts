import { animate, style, transition, trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class ConfigService {
  apiURL: string;
  constructor() {}
}

export class ValidationService {
  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}

export function routerTransition() {
  return slideToLeft();
}

function slideToLeft() {
  return trigger('routerTransition', [
    transition(':enter', [
      style({
        transform: 'translateY(100%)',
        position: 'fixed',
        height: '100%',
      }),
      animate('0.6s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)', position: 'fixed', height: '100%' }),
      animate('0.6s ease-in-out', style({ transform: 'translateY(-100%)' })),
    ]),
  ]);
}
