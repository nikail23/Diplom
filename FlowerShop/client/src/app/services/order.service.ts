import { Observable } from 'rxjs';
import { ProductOrderDto } from '../classes/order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public sendOrder(dto: ProductOrderDto, id: number): Observable<ProductOrderDto> {
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.post(environment.api.url + 'order', dto, {params}) as Observable<ProductOrderDto>;
  }

  public getUserOrders(id: number): Observable<ProductOrderDto[]> {
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.get(environment.api.url + 'order', {params}) as Observable<ProductOrderDto[]>;
  }
}
