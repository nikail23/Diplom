import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() styleClass: string = 'button_type_filled-green';

  @Output() clicked = new EventEmitter<any>();

  public buttonClicked() {
    this.clicked.emit();
  }
}
