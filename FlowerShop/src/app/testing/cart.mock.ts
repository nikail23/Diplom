import { ShoppingCartDto } from '../classes/cart';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

export function getTestShoppingCartDto(): ShoppingCartDto {
  return {
    finished: false,
    orderItems: [
      {
        id: 0,
        itemId: 0,
        priceId: 0,
        quantity: 0
      }
    ],
    text: ''
  }
}

export const cartServiceSpy = jasmine.createSpyObj<CartService>('CartService', [
  'setInCartFlowersState',
  'setInCartFlowerState',
  'loadCart',
  'get',
  'add',
  'delete',
  'updateCart',
  'isLoggedIn',
  'cartFlowers'
], {isLoggedIn: true, cartFlowers: getTestShoppingCartDto().orderItems, cartRefreshed: new EventEmitter()});

cartServiceSpy.loadCart.and.returnValue(of(getTestShoppingCartDto()));
cartServiceSpy.get.and.returnValue(getTestShoppingCartDto().orderItems[0]);
cartServiceSpy.add.and.returnValue(of(getTestShoppingCartDto()));
cartServiceSpy.delete.and.returnValue(of(getTestShoppingCartDto()));
cartServiceSpy.updateCart.and.returnValue(of(getTestShoppingCartDto()));
