import { PaymentType } from './../../services/order';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Path } from '../shared/navigation/path';
import { Flower } from '../home/flower';
import { ItemOrderDto } from 'src/app/services/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isFormControlHasError } from '../shared/forms';
import { CatalogService } from 'src/app/services/catalog.service';
import { OrderService } from 'src/app/services/order.service';

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
  public isFormControlHasError = isFormControlHasError;
  public readonly PaymentType = PaymentType;

  public flowers: Flower[] = [];
  public cartFlowersInfo: ItemOrderDto[] = [];
  public selectedFlowers: boolean[] = [];

  public paymentType = new FormControl('', [Validators.required]);
  public orderForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(17)]),
    text: new FormControl(''),
    address: new FormControl('', Validators.required),
    paymentType: this.paymentType
  });

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
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.cartService.updateCart();
  }

  ngOnInit(): void {
    this.cartFlowersInfo = this.cartService.cartFlowers;
    this.loadFlowers();
    this.cartService.cartRefreshed.subscribe((value) => {
      this.cartFlowersInfo = this.cartService.cartFlowers;
      this.loadFlowers();
    });
  }

  private loadFlowers() {
    this.flowers = [];
    this.selectedFlowers = [];
    this.cartFlowersInfo.forEach((cartFlowerInfo) => {
      this.catalogService
        .get(cartFlowerInfo.itemId)
        .subscribe((flower: Flower) => {
          this.flowers.push(flower);
          this.selectedFlowers.push(false);
        });
    });
  }

  public deleteFlower(flower: Flower) {
    this.cartService.delete(flower.id);
  }

  public deleteSelected() {
    for (let index = 0; index < this.selectedFlowers.length; index++) {
      const isDeleted = this.selectedFlowers[index];
      if (isDeleted) {
        this.deleteFlower(this.flowers[index]);
        this.selectedFlowers.splice(index, 1);
        index--;
      }
    }
  }

  public selectFlowerAsDeleted(isDeleted: boolean, index: number) {
    this.selectedFlowers[index] = isDeleted;
  }

  public confirmOrderClicked() {
    this.cartService.updateCart();
    this.orderForm.updateValueAndValidity();
    if (this.orderForm.valid) {
      this.orderService.sendOrder(
        this.orderForm.controls.address.value,
        'Delivery', // TODO: What is deliveryName?
        this.orderForm.controls.email.value,
        this.orderForm.controls.paymentType.value,
        this.orderForm.controls.phone.value,
        this.cartService.cartFlowers
      ).subscribe((response) => {
        console.log(response)
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  public continueShoppingClicked() {
    this.cartService.updateCart();
    this.router.navigate(['/catalog']);
  }
}
