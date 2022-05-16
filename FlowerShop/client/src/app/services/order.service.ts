import { Observable } from 'rxjs';
import { ProductOrderDto } from '../classes/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public sendOrder(dto: ProductOrderDto): Observable<ProductOrderDto> {
    return this.http.post(environment.api.url + 'order/checkout', dto, {
    }) as Observable<ProductOrderDto>;
  }

  public getUserOrders(): Observable<ProductOrderDto[]> {
    return this.http.get(environment.api.url + 'order') as Observable<ProductOrderDto[]>;
  }
}
