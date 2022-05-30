import { HttpErrorResponse } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { PopupComponent } from './../shared/popup/popup.component';
import { RegistrationService } from '../../services/registration.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import {
  isFormControlHasError,
  isFormControlInvalid,
} from '../../classes/forms';
import {
  checkPasswordsValidator,
  passwordValidator,
} from '../../classes/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public registrationForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      homeAddress: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(17),
      ]),
      password: new FormControl('', [passwordValidator]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    [checkPasswordsValidator]
  );

  public isRulesChecked = false;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
  ) {}

  public registerButtonClick(popup: PopupComponent): void {
    this.registrationForm.updateValueAndValidity();
    if (this.registrationForm.valid && this.isRulesChecked) {
      this.registrationService.register(this.registrationForm.value).subscribe(
        () => {
          this.logIn();
        },
        (error) => {
          this.handleRegistrationError(error, popup);
        }
      );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  public logIn() {
    this.router.navigate(['/log-in']);
  }

  private handleRegistrationError(error: HttpErrorResponse, popup: PopupComponent) {
    if (error.status === 403) {
      popup?.show(
        'The actor with the following email address is already registered.',
        true
      );
    } else {
      popup?.show('Something went wrong!', true);
    }
  }

  public isRulesCheckedChange(value: boolean) {
    this.isRulesChecked = value;
  }
}
