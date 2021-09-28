import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Output() checked = new EventEmitter<boolean>();

  public isChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public inputChecked(): void {
    this.isChecked = !this.isChecked;
    this.checked.emit(this.isChecked);
  }
}
