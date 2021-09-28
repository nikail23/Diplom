import { PopupComponent } from './../../shared/popup/popup.component';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContactsServerService } from 'src/app/services/server/contacts-server.service';
import {
  isFormControlHasError,
  isFormControlInvalid,
} from '../../shared/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public nameControl: AbstractControl = new FormControl('', [Validators.required]);
  public phoneControl: AbstractControl = new FormControl('', [Validators.required, Validators.minLength(17)]);
  public textControl: AbstractControl = new FormControl('', [Validators.required]);

  public form: FormGroup = new FormGroup({
    name: this.nameControl,
    phone: this.phoneControl,
    text: this.textControl,
  });

  @ViewChild(PopupComponent, { static: false })
  popup: PopupComponent | undefined;

  constructor(private contactsService: ContactsServerService) {}

  public sendMessageButtonClick(): void {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.contactsService.sendMessage(this.form.value).subscribe(
        (response) => {
          this.popup?.show(response, false);
        },
        () => {
          this.popup?.show(
            'An error occurred while sending the message. Please, try again.',
            true
          );
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
