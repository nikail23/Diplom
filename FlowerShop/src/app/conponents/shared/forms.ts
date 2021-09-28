import { AbstractControl, FormControl } from '@angular/forms';

export function isFormControlInvalid(formControl?: AbstractControl): boolean {
  if (formControl) {
    return !formControl.valid && (formControl.touched || formControl.dirty);
  }
  return false;
}

export function isFormControlHasError(formControl?: AbstractControl, error?: string): boolean {
  if (formControl && error) {
    return formControl.hasError(error) && (formControl.touched || formControl.dirty);
  }
  return false;
}
