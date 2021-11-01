import { AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isFormControlInvalid } from '../../../classes/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  public isFormControlInvalid = isFormControlInvalid;

  public readonly DefaultNumberMaxValue = 10000;

  @Input() control?: AbstractControl;
  @Input() value?: any;
  @Input() isNumbersOnly?: boolean = false;
  @Input() maxValue?: number;
  @Input() isStripe?: boolean = false;
  @Input() labelText: string = '';
  @Input() required?: boolean = false;
  @Input() errorCondiion?: boolean;
  @Input() isTextArea?: boolean = false;
  @Input() isPhone?: boolean = false;

  @Output() controlChange = new EventEmitter<AbstractControl>();
  @Output() valueChange = new EventEmitter<any>();
  public valueChanges(newValue: any) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

  public clearInput() {
    if (this.value) {
      this.value = '';
    }
    if (this.control) {
      this.control.setValue('');
    }
  }
}
