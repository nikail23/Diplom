import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';
import { isFormControlInvalid } from '../forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  public isFormControlInvalid = isFormControlInvalid;

  @Input() control: AbstractControl = new FormControl();
  @Input() labelText: string = '';
  @Input() required?: boolean = false;
  @Input() errorCondiion?: boolean;
  @Input() isTextArea?: boolean = false;
  @Input() isPhone?: boolean = false;

  @Output() controlChange = new EventEmitter<AbstractControl>();

  public form = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      control: this.control,
    });
    this.control.valueChanges.subscribe((value) => {
      this.controlChange.emit(this.control);
    });
  }
}
