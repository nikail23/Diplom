import { checkNewPasswordsValidator, passwordValidator } from './../shared/validators';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Path } from '../shared/navigation/path';
import { isFormControlHasError, isFormControlInvalid } from '../shared/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateUserDto } from 'src/app/services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public readonly paths: Path[] = [
    {name: 'Home', routerLink: '/home'},
    {name: 'My account', routerLink: '/profile'},
  ];

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
  public newPasswordControl = new FormControl('', [Validators.required, passwordValidator]);
  public newPasswordConfirmControl = new FormControl('', Validators.required);

  public accountForm: FormGroup = new FormGroup(
    {
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      homeAddress: this.homeAddressControl,
      phone: this.phoneControl,
    }
  );

  public changePasswordForm = new FormGroup({
    newPassword: this.newPasswordControl,
    newPasswordConfirm: this.newPasswordConfirmControl
  }, [checkNewPasswordsValidator]);

  public isChangePasswordInputsShow: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.userService.getCurrentUserInfo().subscribe((currentUser: any) => {
      this.firstNameControl.setValue(currentUser.firstName);
      this.lastNameControl.setValue(currentUser.lastName);
      this.emailControl.setValue(currentUser.email);
      this.phoneControl.setValue(currentUser.phone);
      this.homeAddressControl.setValue(currentUser.homeAddress);
      this.accountForm.updateValueAndValidity();
    });
  }

  // TODO: Check this method, when address adds
  public updateCurrentUser(): void {
    this.accountForm.updateValueAndValidity();
    if (this.accountForm.valid) {
      const updateUserDto: UpdateUserDto = {
        firstName: this.firstNameControl.value,
        lastName: this.lastNameControl.value,
        email: this.emailControl.value,
        phone: this.phoneControl.value,
        homeAddress: this.homeAddressControl.value,
        shippingAddress: this.homeAddressControl.value
      };
      this.userService.updateCurrentUser(updateUserDto).subscribe(() => {
        this.loadCurrentUser();
      });
    }
  }

  public changePasswordClick(): void {
    if (this.isChangePasswordInputsShow) {
      this.changePasswordForm.updateValueAndValidity();
      if (this.changePasswordForm.valid) {
        const newPassword = this.newPasswordControl.value;
        this.userService.changePassword(newPassword).subscribe(() => {
          this.changePasswordForm.reset();
          this.isChangePasswordInputsShow = false;
        });
      } else {
        this.changePasswordForm.markAllAsTouched();
      }
    } else {
      this.isChangePasswordInputsShow = true;
    }
  }

  public logOutClick(): void {
    this.userService.logOut();
  }
}
