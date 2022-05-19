import {
  paymentDialogHeight,
  paymentDialogWidth,
  paymentMobileDialogHeight,
  paymentMobileDialogWidth,
} from './../../classes/global-variables';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupComponent } from './../shared/popup/popup.component';
import { ProductOrderDto } from './../../classes/order';
import { PaymentDialogComponent } from './../payment-dialog/payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentType } from '../../classes/order';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Path } from '../../classes/path';
import { Flower } from '../../classes/flower';
import { ItemOrderDto } from 'src/app/classes/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isFormControlHasError } from '../../classes/forms';
import { CatalogService } from 'src/app/services/catalog.service';
import { OrderService } from 'src/app/services/order.service';
import { concat, forkJoin, Observable, of, timer } from 'rxjs';
import { mergeMap, switchMap, last } from 'rxjs/operators';

@Component({
  selector: 'app-cart-and-order',
  templateUrl: './cart-and-order.component.html',
  styleUrls: ['./cart-and-order.component.scss'],
})
export class CartAndOrderComponent implements OnInit, OnDestroy {
  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'Cart and order placement', routerLink: '/cart-and-order' },
  ];
  public readonly PaymentType = PaymentType;
  public isFormControlHasError = isFormControlHasError;

  public flowers: Flower[] = [];
  public cartFlowersInfo: ItemOrderDto[] = [];
  public selectedFlowers: boolean[] = [];

  public orderForm: FormGroup = new FormGroup({
    deliveryAddress: new FormControl('', Validators.required),
    deliveryName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(17)]),
    text: new FormControl(''),
    paymentType: new FormControl('', [Validators.required]),
    productItems: new FormControl(this.cartService.cartFlowers),
  });

  @ViewChild(PopupComponent)
  private popup?: PopupComponent;

  public get totalItemsPrice(): number {
    let total: number = 0;
    for (
      let index = 0;
      index < this.flowers.length && index < this.cartFlowersInfo.length;
      index++
    ) {
      const flowerPrice = this.flowers[index].priceDto.price;
      const flowerCount = this.cartFlowersInfo[index].quantity;
      total += flowerPrice * flowerCount;
    }
    return total;
  }

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.cartService.updateCart().subscribe(() => {});
  }

  ngOnInit(): void {
    this.cartService.loadCart().pipe(
      mergeMap((cart) => {
        this.cartFlowersInfo = this.cartService.cartFlowers;
        return this.getLoadFlowersObservables(this.cartFlowersInfo);
      })
    ).subscribe((flowers) => {
      this.flowers = flowers;
    });

    this.catalogService.get(1).subscribe((flower: Flower) => {
      this.flowers = [flower];
      this.cartFlowersInfo = [{
        itemId: flower.id,
        priceId: flower.priceDto.id,
        quantity: 1
      }];
    });
  }

  private getLoadFlowersObservables(cartFlowersInfo: ItemOrderDto[]) {
    let requests: Observable<Flower>[] = [];

    cartFlowersInfo.forEach((cartFlowerInfo) => {
      requests.push(this.catalogService.get(cartFlowerInfo.itemId));
    });

    return forkJoin(requests);
  }

  public deleteFlowerButtonClicked(flower: Flower) {
    this.cartService.delete(flower.id).pipe(
      mergeMap((cart) => {
        this.cartFlowersInfo = cart.orderItems;
        return this.getLoadFlowersObservables(this.cartFlowersInfo);
      })
    ).subscribe((flowers) => {
      this.flowers = flowers;
    });
  }

  public deleteSelectedFlowersButtonClicked() {
    this.cartService
      .updateCart()
      .pipe(
        switchMap(() => concat(...this.getDeleteFlowersObservables())),
        last(),
        mergeMap((cart) => {
          this.cartFlowersInfo = cart.orderItems;
          return this.getLoadFlowersObservables(this.cartFlowersInfo);
        })
      )
      .subscribe((flowers) => {
        this.flowers = flowers;
        this.selectedFlowers = [];
      });
  }

  private getDeleteFlowersObservables() {
    const observables$ = [];

    for (let index = 0; index < this.selectedFlowers.length; index++) {
      const isDeleted = this.selectedFlowers[index];
      if (isDeleted) {
        observables$.push(this.cartService.delete(this.flowers[index].id));
      }
    }

    return observables$;
  }

  public selectFlowerAsDeleted(isDeleted: boolean, index: number) {
    this.selectedFlowers[index] = isDeleted;
  }

  private generateDeliveryName() {
    const deliveryNameNumber = Math.round(
      Math.random() * (999999999 - 100000000) + 100000000
    );
    const deliveryName = `Order #${deliveryNameNumber}`;
    this.orderForm.controls.deliveryName.patchValue(deliveryName);
  }

  public confirmOrderClicked() {
    this.cartService
      .updateCart()
      .pipe(
        mergeMap((cart) => {
          this.cartFlowersInfo = cart?.orderItems ?? [];
          return this.getLoadFlowersObservables(this.cartFlowersInfo);
        }),
        mergeMap((flowers) => {
          this.flowers = flowers;
          this.generateDeliveryName();
          this.orderForm.updateValueAndValidity();
          if (this.orderForm.valid) {
            return this.orderService.sendOrder(this.orderForm.value);
          } else {
            this.orderForm.markAllAsTouched();
            return of(undefined);
          }
        })
      )
      .subscribe(
        (response) => {
          if (response?.paymentType === PaymentType.ONLINE) {
            this.openPaymentDialog(response);
          } else {
            this.handleNotOnlinePaymentFlow();
          }
        },
        (error: HttpErrorResponse) => {
          this.handleOrderCheckoutError(error);
        }
      );
  }

  private handleNotOnlinePaymentFlow() {
    this.popup?.show('Your order are registered.', false);
    timer(2000).subscribe(() => {
      this.orderForm.reset();
      this.router.navigate(['/home']);
    });
  }

  private handleOrderCheckoutError(error: HttpErrorResponse) {
    this.popup?.show(error.message, true);
    this.orderForm.reset();
  }

  private openPaymentDialog(response?: ProductOrderDto) {
    let height, minWidth;
    if (window.innerWidth > 1024) {
      height = paymentDialogHeight;
      minWidth = paymentDialogWidth;
    } else {
      height = paymentMobileDialogHeight;
      minWidth = paymentMobileDialogWidth;
    }
    this.dialog.open(PaymentDialogComponent, {
      data: {
        productOrderId: response?.id,
        amount: this.totalItemsPrice,
        isLoggedIn: this.cartService.isLoggedIn,
      },
      height,
      minWidth,
      backdropClass: 'backdrop',
    });
  }

  public continueShoppingClicked() {
    this.cartService.updateCart().subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  public setCount(id: number, event: any) {
    if (this.cartFlowersInfo[id]) {
      this.cartFlowersInfo[id].quantity = event;
      // console.log(event)
    }
  }
}
