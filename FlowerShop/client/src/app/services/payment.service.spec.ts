import { testChargeRequestDto } from './../testing/payment.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaymentService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send payment request', () => {
    service.sendPaymentRequest(testChargeRequestDto).subscribe((status) => {
      expect(status).toBeTrue();
    });

    const sendPayment = httpController.expectOne(environment.api.url + 'payments/charge');

    expect(sendPayment.request.method).toEqual('POST');

    sendPayment.event(new HttpResponse<boolean>({body: true}));
  });
});
