import { PopupComponent } from './../../shared/popup/popup.component';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import {
  isFormControlHasError,
  isFormControlInvalid,
} from '../../../classes/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  public isFormControlHasError = isFormControlHasError;
  public isFormControlInvalid = isFormControlInvalid;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(17),
    ]),
    text: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private contactsService: ContactsService) {}

  public sendMessageButtonClick(popup: PopupComponent): void {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.contactsService.sendMessage(this.form.value).subscribe(
        (response) => {
          popup?.show(response, false);
        },
        () => {
          popup?.show(
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
