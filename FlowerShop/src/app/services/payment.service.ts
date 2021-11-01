import { environment } from 'src/environments/environment.prod';
import { ChargeRequestDto } from '../classes/payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public sendPaymentRequest(chargeRequestDto: ChargeRequestDto) {
    return this.http.post(environment.api.url + 'payments/charge', chargeRequestDto);
  }
}
