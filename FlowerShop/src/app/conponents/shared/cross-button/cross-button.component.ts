import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cross-button',
  templateUrl: './cross-button.component.html',
  styleUrls: ['./cross-button.component.scss']
})
export class CrossButtonComponent implements OnInit {

  public checked: boolean = false;

  @Input() isOnlyCross = false;
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

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
