import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() value: any;

  @Output() checked = new EventEmitter<any>();

  public isChecked: boolean = false;

  public inputChecked(): void {
    this.isChecked = !this.isChecked;
    if (this.value) {
      this.checked.emit({ checked: this.isChecked, value: this.value });
    } else {
      this.checked.emit(this.isChecked);
    }
  }
}
