import { CatalogComponent } from './../catalog/catalog.component';
import { dialogSpy } from '../../testing/dialog.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestProductOrderDto } from '../../testing/order.mock';
import { CartService } from './../../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricePipe } from './../../pipes/price.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartAndOrderComponent } from './cart-and-order.component';
import { KeycloakService } from 'keycloak-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {
  cartServiceSpy,
} from 'src/app/testing/cart.mock';
import { orderServiceSpy } from 'src/app/testing/order.mock';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';

describe('CartAndOrderComponent', () => {
  let component: CartAndOrderComponent;
  let fixture: ComponentFixture<CartAndOrderComponent>;
  let cartService: CartService;
  let orderService: OrderService;
  let router: Router;
  let dialog: MatDialog;
  const productOrder = getTestProductOrderDto();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([{
          path: 'catalog', component: CatalogComponent
        }]),
      ],
      declarations: [CartAndOrderComponent, PricePipe],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: CatalogService, useValue: catalogServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAndOrderComponent);
    cartService = TestBed.inject(CartService);
    orderService = TestBed.inject(OrderService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update cart on destroy', () => {
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(cartService.updateCart).toHaveBeenCalled();
  });

  it('should load cart flowers on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.cartFlowersInfo).toEqual(cartService.cartFlowers);
    expect(component.flowers.length).toBe(1);
    expect(component.flowers[0].id).toBe(cartService.cartFlowers[0].itemId);
  });

  it('should call cart service delete method on deleteFlowerButton clicked', () => {
    component.deleteFlowerButtonClicked(component.flowers[0]);
    fixture.detectChanges();
    expect(cartService.delete).toHaveBeenCalled();
  });

  it('should call cart service sendOrder method on confirmOrderButton clicked', () => {
    component.orderForm.patchValue(productOrder);
    fixture.detectChanges();
    component.confirmOrderClicked();
    expect(orderService.sendOrder).toHaveBeenCalled();
  });

  it('should open payment dialog if order check was success', () => {
    component.orderForm.patchValue(productOrder);
    fixture.detectChanges();
    component.confirmOrderClicked();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should call router navigate method on continueShoppingButton clicked', () => {
    spyOn(router, 'navigate');
    component.continueShoppingClicked();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call cart service updateCart method on continueShoppingButton clicked', () => {
    component.continueShoppingClicked();
    fixture.detectChanges();
    expect(cartService.updateCart).toHaveBeenCalled();
  });
});
