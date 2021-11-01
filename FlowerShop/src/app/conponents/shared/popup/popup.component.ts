import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  public isActive: boolean = false;
  public response: string = '';
  public isError: boolean = false;

  private waitUntilClosed(time: number): void {
    timer(time).subscribe((value) => {
      this.close();
    });
  }

  public close(): void {
    this.isActive = false;
    this.response = '';
    this.isError = false;
  }

  public show(response: string, isError: boolean): void {
    this.response = response;
    this.isError = isError;
    if (!this.isActive) {
      this.isActive = true;
      this.waitUntilClosed(3000);
    }
  }
}
