import { TokenResult } from '@stripe/stripe-js';
import { StripeService } from '../services/stripe.service';

const testToken: TokenResult = {
  token: {
    id: 'token',
    object: 'token',
    client_ip: null,
    created: 0,
    livemode: false,
    type: '',
    used: false
  }
}

const fn = (cardNumberSelector: string, cardExpirySelector: string, cardCvcSelector: string) => new Promise<void>((resolve) => resolve());
export const stripeSpy = jasmine.createSpyObj<StripeService>('StripeService', ['initializeStripe', 'getToken']);
stripeSpy.getToken.and.returnValue(new Promise((resolve) => resolve(testToken)));
stripeSpy.initializeStripe.and.callFake(fn);
