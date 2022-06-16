import { PopupComponent } from './../shared/popup/popup.component';
import { tap, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  checkNewPasswordsValidator,
  passwordValidator,
} from '../../classes/validators';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Path } from '../../classes/path';
import {
  isFormControlHasError,
  isFormControlInvalid,
} from '../../classes/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'My account', routerLink: '/profile' },
  ];

  public accountForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    homeAddress: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(17),
    ]),
  });

  public changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [passwordValidator]),
    newPassword: new FormControl('', [passwordValidator]),
    newPasswordConfirm: new FormControl('', Validators.required),
  }, [checkNewPasswordsValidator]);

  public isChangePasswordInputsShow = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe((user: any) => {
      delete(user.password);
      this.accountForm.setValue(user);
      this.accountForm.updateValueAndValidity();
    });
  }

  public saveChangesClick(popup: PopupComponent): void {
    this.accountForm.updateValueAndValidity();
    if (this.accountForm.valid) {
      this.userService
        .updateCurrentUser(this.accountForm.value)
        .pipe(
          tap(() => this.accountForm.reset()),
          mergeMap(() => this.userService.getCurrentUserInfo())
        )
        .subscribe(
          (user) => {
            delete((user as any).password);
            this.accountForm.setValue(user);
            this.accountForm.updateValueAndValidity();
            popup.show('Succesfully changed!', false);
          },
          (error: HttpErrorResponse) => {
            popup.show('Something went wrong!', true);
          }
        );
    }
  }

  private changePassword(popup: PopupComponent) {
    this.changePasswordForm.updateValueAndValidity();
    if (this.changePasswordForm.valid) {
      this.userService
        .changePassword(this.changePasswordForm.value)
        .subscribe(
          () => {
            this.changePasswordForm.reset();
            this.isChangePasswordInputsShow = false;
            popup.show('Succesfully changed!', false);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.changePasswordForm.controls.oldPassword.setErrors({ wrongPassword: true });
              popup.show("Wrong password!", true);
            }
          }
        );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  public changePasswordClick(popup: PopupComponent): void {
    if (this.isChangePasswordInputsShow) {
      this.changePassword(popup);
    } else {
      this.isChangePasswordInputsShow = true;
    }
  }

  public logOutClick(): void {
    this.userService.logOut();
  }
}
