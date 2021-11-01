import { OrderStatus, PaymentType, ProductOrderDto } from '../classes/order';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { getTestShoppingCartDto } from './cart.mock';

export function getTestProductOrderDto(): ProductOrderDto {
  return {
    deliveryAddress: 'Minsk',
    deliveryName: 'Ilya Yermolovich',
    email: '123@gmail.com',
    id: 0,
    orderStatus: OrderStatus.DELIVERY,
    paymentType: PaymentType.ONLINE,
    phone: '+375 29 858-36-75',
    productItems: [getTestShoppingCartDto().orderItems[0]],
    text: 'Text',
  }
}

export const orderServiceSpy = jasmine.createSpyObj<OrderService>('OrderService', ['sendOrder', 'getUserOrders']);
orderServiceSpy.getUserOrders.and.returnValue(of([getTestProductOrderDto()]));
orderServiceSpy.sendOrder.and.returnValue(of(getTestProductOrderDto()));
