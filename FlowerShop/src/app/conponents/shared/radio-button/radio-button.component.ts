import { PaymentType } from './../../../services/order';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Output() checked = new EventEmitter<boolean>();

  public isChecked: boolean = false;

  @Input() value: any;
  @Input() control: FormControl = new FormControl();
  public form = new FormGroup({
    control: this.control
  });

  constructor() { }

  ngOnInit(): void {
  }

  public inputChecked(): void {
    this.isChecked = !this.isChecked;
    this.checked.emit(this.isChecked);
  }
}
