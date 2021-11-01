import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl][phoneMask]',
})
export class PhoneDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    if (event) {
      this.onInputChange(event.target.value, true);
    }
  }

  onInputChange(event: any, backspace: boolean) {
    if (event && this.ngControl.valueAccessor) {
      let newValue = event.replace(/\D/g, '');
      if (newValue.length === 0) {
        newValue = '';
      } else if (newValue.length <= 3) {
        newValue = newValue.replace(/^(\d{0,3})/, '+$1');
      } else if (newValue.length <= 5) {
        newValue = newValue.replace(/^(\d{0,3})(\d{0,2})/, '+$1 $2');
      } else if (newValue.length <= 8) {
        newValue = newValue.replace(
          /^(\d{0,3})(\d{0,2})(\d{0,3})/,
          '+$1 $2 $3'
        );
      } else if (newValue.length <= 10) {
        newValue = newValue.replace(
          /^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})/,
          '+$1 $2 $3-$4'
        );
      } else if (newValue.length <= 12) {
        newValue = newValue.replace(
          /^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/,
          '+$1 $2 $3-$4-$5'
        );
      } else {
        newValue = newValue.substring(0, 12);
        newValue = newValue.replace(
          /^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/,
          '+$1 $2 $3-$4-$5'
        );
      }
      this.ngControl.valueAccessor.writeValue(newValue);
    }
  }
}
