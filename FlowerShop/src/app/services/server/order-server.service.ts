import { HttpClient } from '@angular/common/http';
import { ProductOrderDto } from './../order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderServerService {

  constructor(private http: HttpClient) { }

  public post(dto: ProductOrderDto) {
    return this.http.post(environment.api.url + 'order/checkout', dto, {withCredentials: true});
  }
}
