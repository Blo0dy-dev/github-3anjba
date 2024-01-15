import { AbstractControl } from '@angular/forms';

export function averageValidator() {
  return (control: AbstractControl) => {
    if (
      control.value == '' ||
      control.value == null ||
      control.value == undefined ||
      control.value == null
    ) {
      return null;
      // return { ValidateAverage: { value: true } };
    } else {
      if (isNaN(control.value) == false) {
        var control_value = Number(control.value);
      } else {
        return { ValidateAverage: { value: true } };
      }
    }

    if (control_value > 5.0 || control_value < 1.0) {
      return { ValidateAverage: { value: true } };
    }
    if (control.value.toString().split('.')[1]) {
      if (control.value.toString().split('.')[1].length > 2) {
        return { ValidateAverage: { value: true } };
      }
    } else if (control.value.toString().split('.').length > 1) {
      return { ValidateAverage: { value: true } };
    } else if (
      control.value.toString()[1] &&
      control.value.toString()[1] != '.'
    ) {
      return { ValidateAverage: { value: true } };
    }

    return null;
  };
}
