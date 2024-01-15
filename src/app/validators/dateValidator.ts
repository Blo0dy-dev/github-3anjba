import { AbstractControl } from '@angular/forms';
import moment from 'moment';

export function minYearValidator(minYear: number, maxYear: number) {
  return (control: AbstractControl) => {
    const validationString = moment(control.value).format('YYYY');
    if (validationString === 'Invalid date') {
      return null;
      // return { ValidateDate: { value: true } };
    }

    if (
      Number(validationString) <= minYear ||
      Number(validationString) >= maxYear
    ) {
      return { ValidateDate: { value: true } };
    }

    return null;
  };
}
