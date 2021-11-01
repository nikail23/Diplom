import { SortParameters } from './../../../classes/products-parameters';
import { FormControl, AbstractControl } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
  @Input() value: any;
  @Input() radio?: AbstractControl;
  @Input() model: any;
  @Output() modelChange = new EventEmitter();

  public modelChanged(event: any) {
    this.modelChange.emit(this.value);
  }
}
