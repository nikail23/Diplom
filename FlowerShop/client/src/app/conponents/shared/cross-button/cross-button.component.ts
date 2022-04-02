import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cross-button',
  templateUrl: './cross-button.component.html',
  styleUrls: ['./cross-button.component.scss'],
})
export class CrossButtonComponent {
  public checked: boolean = false;

  @Input() isOnlyCross = false;
  @Input() colorClass?: string = 'black';

  @Output() clicked = new EventEmitter<string>();

  public buttonClicked() {
    if (this.checked) {
      this.checked = false;
      this.clicked.emit('checked');
    } else {
      this.checked = true;
      this.clicked.emit('unchecked');
    }
  }
}
