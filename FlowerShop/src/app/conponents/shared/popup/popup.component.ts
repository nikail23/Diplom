import { Component, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnDestroy {

  public isActive: boolean = false;
  public response: string = '';
  public isError: boolean = false;

  private subscribtion: Subscription = Subscription.EMPTY;

  constructor() { }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  private waitUntilClosed(time: number): void {
    const observable = timer(time);
    this.subscribtion = observable.subscribe((value) => {
      this.close();
    });
  }

  public close(): void {
    this.subscribtion.unsubscribe();
    this.subscribtion = Subscription.EMPTY;
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
