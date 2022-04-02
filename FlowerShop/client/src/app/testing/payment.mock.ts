import { ChargeRequestDto, Currency } from './../classes/payment';
import { of } from 'rxjs';
import { PaymentService } from '../services/payment.service';

export const testChargeRequestDto: ChargeRequestDto = {
  amount: 100,
  currency: Currency.EUR,
  description: '',
  productOrderId: 0,
  stripeEmail: '',
  stripeToken: ''
}

export const paymentServiceSpy = jasmine.createSpyObj<PaymentService>('PaymentService', ['sendPaymentRequest']);
paymentServiceSpy.sendPaymentRequest.and.returnValue(of());
