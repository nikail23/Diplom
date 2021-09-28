import { ItemOrderDto } from 'src/app/services/cart';
import { ShoppingCartDto } from './../cart';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServerService {

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get(environment.api.url + 'cart', {withCredentials: true})
  }

  public postCard(dto: ShoppingCartDto): Observable<any> {
    return this.http.post(environment.api.url + 'cart', dto, {withCredentials: true});
  }

  public addItem(dto: ItemOrderDto): Observable<any> {
    return this.http.post(environment.api.url + 'cart/item', dto, {withCredentials: true});
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(environment.api.url + `cart/item/${id}`, {withCredentials: true})
  }

  public update(dto: ShoppingCartDto) {
    return this.http.put(environment.api.url + 'cart', dto, {withCredentials: true});
  }
}
