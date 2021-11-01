import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  passwordFormControl: AbstractControl
): null | ValidationErrors => {
  if (!/^([\d,\w]{8,})$/.test(passwordFormControl.value)) {
    return { passwordValidator: true };
  }
  return null;
};

export const checkPasswordsValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let password = group.get('password')?.value;
  let repeatPassword = group.get('repeatPassword')?.value;
  return password === repeatPassword ? null : { checkPasswordsValidator: true };
};

export const checkNewPasswordsValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let password = group.get('newPassword')?.value;
  let repeatPassword = group.get('newPasswordConfirm')?.value;
  return password === repeatPassword
    ? null
    : { checkNewPasswordsValidator: true };
};
