import { KeycloakService } from 'keycloak-angular';
import { PopupComponent } from './../shared/popup/popup.component';
import { RegistrationServerService } from '../../services/server/registration-server.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { isFormControlHasError, isFormControlInvalid } from '../shared/forms';
import { checkPasswordsValidator, passwordValidator } from '../shared/validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public firstNameControl = new FormControl('', Validators.required);
  public lastNameControl = new FormControl('', Validators.required);
  public emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public phoneControl = new FormControl('', [
    Validators.required,
    Validators.minLength(17),
  ]);
  public homeAddressControl = new FormControl('', Validators.required);
  public passwordControl = new FormControl('', [passwordValidator]);
  public repeatPasswordControl = new FormControl('', [Validators.required]);

  public form: FormGroup = new FormGroup(
    {
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      homeAddress: this.homeAddressControl,
      phone: this.phoneControl,
      password: this.passwordControl,
      repeatPassword: this.repeatPasswordControl,
    },
    [checkPasswordsValidator]
  );

  @ViewChild(PopupComponent, { static: false })
  popup: PopupComponent | undefined;

  constructor(
    private registrationService: RegistrationServerService,
    private keycloakService: KeycloakService
  ) {}

  public registerButtonClick(): void {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.registrationService.register(this.form.value).subscribe(
        (response) => {
          this.keycloakService.login({
            redirectUri: window.location.origin + '/home',
          });
        },
        (error) => {
          if (error.status === 403) {
            this.popup?.show(
              'The actor with the following email address is already registered.',
              true
            );
          } else {
            this.popup?.show(error.error, true);
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  public logInButtonClick() {
    this.keycloakService.login({
      redirectUri: window.location.origin + '/home',
    });
  }
}
