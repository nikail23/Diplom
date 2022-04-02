import { tap, mergeMap } from 'rxjs/operators';
import { StripeService } from './../../services/stripe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChargeRequestDto, Currency } from '../../classes/payment';
import { PaymentService } from './../../services/payment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { Component, Inject, OnInit } from '@angular/core';
import { Token } from '@stripe/stripe-js';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit {
  public readonly CardNumberSelector = '.stripe__card-number';
  public readonly CardExpirySelector = '.stripe__card-expiry';
  public readonly CardCvcSelector = '.stripe__card-cvc';

  public name: string = '';
  public amount: number = 0;

  private productOrderId: number = 0;
  private stripeAmount: number = 0;
  private isLoggedIn: boolean = false;

  public error: string = '';
  public isSuccessPayment: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialogRef<PaymentDialogComponent>,
    private paymentService: PaymentService,
    private router: Router,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.fillData(this.data);
    this.stripeService.initializeStripe(
      this.CardNumberSelector,
      this.CardExpirySelector,
      this.CardCvcSelector
    );
  }

  private fillData(data: any) {
    this.productOrderId = data.productOrderId;
    this.amount = Math.round(data.amount * 100) / 100;
    this.stripeAmount = Math.round(this.amount * 100);
    this.isLoggedIn = data.isLoggedIn;
  }

  public sendPaymentRequest() {
    const tokenPromise$ = this.stripeService.getToken(this.name);
    if (tokenPromise$) {
      tokenPromise$.then((result) => {
        if (result.error) {
          this.error = result.error.message ?? 'Something went wrong!';
        } else {
          this.sendToken(result.token);
        }
      });
    }
  }

  private sendToken(token: Token) {
    const chargeRequestDto: ChargeRequestDto = {
      amount: this.stripeAmount,
      currency: Currency.EUR,
      description: '',
      productOrderId: this.productOrderId,
      stripeToken: token.id,
      stripeEmail: environment.stripe.email,
    };
    this.paymentService
      .sendPaymentRequest(chargeRequestDto)
      .pipe(
        tap(() => (this.isSuccessPayment = true)),
        mergeMap(() => timer(3000))
      )
      .subscribe(
        () => {
          this.handlePaymentSuccessResponse();
        },
        (error: HttpErrorResponse) => {
          this.isSuccessPayment = false;
          this.error = error.message;
        }
      );
  }

  private handlePaymentSuccessResponse() {
    if (this.isLoggedIn) {
      this.router.navigate(['/orders']);
    } else {
      this.router.navigate(['/home']);
    }
    this.dialog.close();
  }
}
