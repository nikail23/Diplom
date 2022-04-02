import { Injectable } from '@angular/core';
import { loadStripe, Stripe, TokenResult } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripe: Stripe | null = null;
  private cardNumber: any;

  constructor() { }

  public async initializeStripe(cardNumberSelector: string, cardExpirySelector: string, cardCvcSelector: string) {
    this.stripe = await loadStripe(environment.stripe.key);
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.cardNumber = elements.create('cardNumber', { showIcon: true });
      this.cardNumber.mount(cardNumberSelector);
      elements.create('cardExpiry').mount(cardExpirySelector);
      elements.create('cardCvc').mount(cardCvcSelector);
    }
  }

  public getToken(name: string): Promise<TokenResult> | null {
    if (this.stripe) {
      return this.stripe?.createToken(this.cardNumber, { name })
    }
    return null;
  }
}
