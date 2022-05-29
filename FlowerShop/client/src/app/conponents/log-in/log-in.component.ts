import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isFormControlHasError, isFormControlInvalid } from 'src/app/classes/forms';
import { passwordValidator, checkPasswordsValidator } from 'src/app/classes/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  constructor(
    private registrationService: RegistrationService,
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
      this.registrationService.logIn(this.logInForm.getRawValue()).subscribe((currentAccount: any) => {
        console.log(currentAccount);
        this.router.navigate(['home']);
      });
    }
  }
}
