import { PopupComponent } from './../shared/popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isFormControlHasError, isFormControlInvalid } from 'src/app/classes/forms';
import { passwordValidator, checkPasswordsValidator } from 'src/app/classes/validators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  @ViewChild(PopupComponent)
  popup?: PopupComponent;

  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  constructor(
    private registrationService: RegistrationService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public logInForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
  );

  register(): void {
    this.router.navigate(['registration']);
  }

  logIn(): void {
    if (this.logInForm.valid) {
      this.registrationService.logIn(this.logInForm.getRawValue()).subscribe(
        (currentAccount: any) => {
          localStorage.setItem('USER_ID', currentAccount.id);
          this.userService.updateLoggedState();
          this.router.navigate(['home']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.popup?.show('Can\'t find user with this email and password!', true);
          } else {
            this.popup?.show('Something went wrong', true);
          }
        }
      );
    }
  }
}
