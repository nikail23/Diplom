import { CatalogService } from './catalog.service';
import { ItemOrderDto, ShoppingCartDto } from '../classes/cart';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Flower } from '../classes/flower';
import { UserService } from './user.service';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public isLoggedIn: boolean = false;

  private cart?: ShoppingCartDto;

  @Output() cartRefreshed = new EventEmitter<ItemOrderDto[]>();

  public get cartFlowers(): ItemOrderDto[] {
    return this.cart?.orderItems ?? [];
  }

  constructor(
    private userService: UserService,
    private catalogService: CatalogService,
    private http: HttpClient
  ) {
    this.loadCart().subscribe((cart) => {
      this.cart = cart;
      this.cartRefreshed.emit(this.cartFlowers);
    });
  }

  private checkInFlowers(id: number) {
    let result: boolean = false;
    this.cart?.orderItems.forEach((flower) => {
      if (id === flower.itemId) {
        result = true;
      }
    });
    return result;
  }

  public setInCartFlowersState(flowers: Flower[]): void {
    flowers.forEach((flower) => {
      this.setInCartFlowerState(flower);
    });
  }

  public setInCartFlowerState(flower: Flower): void {
    if (this.checkInFlowers(flower.id)) {
      flower.inCart = true;
    }
  }

  public loadCart(): Observable<ShoppingCartDto | undefined> {
    const emptyCart = {
      finished: false,
      orderItems: [],
      text: '',
    };
    return this.userService.loggedState.pipe(
      tap((isLoggedIn) => (this.isLoggedIn = isLoggedIn)),
      mergeMap(() => this.http.get(environment.api.url + 'cart') as Observable<ShoppingCartDto>),
      tap((cart) => {
        this.cart = cart;
        this.cartRefreshed.emit(this.cart?.orderItems);
      }),
      catchError((error) => {
        if (error.status === 404) {
          return this.http.post(environment.api.url + 'cart', emptyCart) as Observable<ShoppingCartDto>;
        }
        return of(undefined);
      })
    );
  }

  public get(id: number): ItemOrderDto | undefined {
    let result: ItemOrderDto | undefined;
    this.cart?.orderItems.forEach((flower) => {
      if (id === flower.itemId) {
        result = flower;
      }
    });
    return result;
  }

  public add(id: number): Observable<ShoppingCartDto> {
    return this.catalogService.get(id).pipe(
      mergeMap((flower) => {
        const flowerDto = {
          itemId: flower.id,
          priceId: flower.priceDto.id,
          quantity: 1,
        };
        return this.http.post(environment.api.url + 'cart/item', flowerDto) as Observable<ShoppingCartDto>;
      }),
      tap((cart) => {
        this.cart = cart;
        this.cartRefreshed.emit(this.cart?.orderItems);
      })
    );
  }

  private getItemId(flowerId: number): number {
    let result;
    this.cart?.orderItems.forEach((item) => {
      if (item.itemId === flowerId) {
        result = item.id;
      }
    });
    return result ?? -1;
  }

  public delete(flowerId: number): Observable<ShoppingCartDto> {
    const itemId = this.getItemId(flowerId);
    return (this.http.delete(environment.api.url + `cart/item/${itemId}`) as Observable<ShoppingCartDto>).pipe(
      tap((cart) => {
        this.cart = cart;
        this.cartRefreshed.emit(this.cart?.orderItems);
      })
    );
  }

  public updateCart(): Observable<ShoppingCartDto | undefined> {
    if (this.cart) {
      return (this.http.put(environment.api.url + 'cart', this.cart) as Observable<ShoppingCartDto>).pipe(
        tap((cart: ShoppingCartDto) => {
          this.cart = cart;
          this.cartRefreshed.emit(this.cart?.orderItems);
        })
      );
    }
    return of(undefined);
  }
}
