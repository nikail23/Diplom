import { CatalogService } from './catalog.service';
import { CartServerService } from './server/cart-server.service';
import { ItemOrderDto, ShoppingCartDto } from './cart';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Flower } from '../conponents/home/flower';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart?: ShoppingCartDto;

  @Output() cartRefreshed = new EventEmitter<ItemOrderDto[]>();

  public get cartFlowers(): ItemOrderDto[] {
    return this.cart?.orderItems ?? [];
  }

  constructor(
    private cartServerService: CartServerService,
    private userService: UserService,
    private catalogService: CatalogService
  ) {
    this.loadCart();
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

  private loadCart(): void {
    this.userService.getLoggedState().subscribe((isLogged: boolean) => {
      this.cartServerService.get().subscribe(
        (response: any) => {
          this.cart = response;
          this.cartRefreshed.emit(this.cart?.orderItems);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.cartServerService.postCard({
              finished: false,
              orderItems: [],
              text: ''
            }).subscribe((cart: ShoppingCartDto) => {
              this.cart = cart;
              this.cartRefreshed.emit(this.cart?.orderItems);
            });
          }
        });
    });
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

  public add(id: number): Observable<any> {
    return new Observable((subscriber) => {
      this.catalogService.get(id).subscribe((flower: Flower) => {
        this.cartServerService
          .addItem({
            itemId: flower.id,
            priceId: flower.priceDto.id,
            quantity: 1,
          })
          .subscribe((cart) => {
            this.cart = cart;
            this.cartRefreshed.emit(this.cart?.orderItems);
            subscriber.next();
          });
      });
    });
  }

  private getItemId(flowerId: number): number {
    let result;
    this.cart?.orderItems.forEach((item) => {
      if ((item.itemId === flowerId)) {
        result = item.id;
      }
    });
    return result ?? -1;
  }

  // private getItem(flowerId: number)

  public delete(flowerId: number): void {
    const itemId = this.getItemId(flowerId);
    this.cartServerService.delete(itemId).subscribe((cart) => {
      this.cart = cart;
      this.cartRefreshed.emit(this.cart?.orderItems);
    });
  }

  public updateCart() {
    if (this.cart) {
      this.cartServerService.update(this.cart).subscribe((cart: any) => {
        this.cart = cart;
        this.cartRefreshed.emit(this.cart?.orderItems);
      })
    }
  }
}
