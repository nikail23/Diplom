import { ItemOrderDto } from 'src/app/services/cart';
import { OrderStatus, PaymentType, ProductOrderDto } from './order';
import { OrderServerService } from './server/order-server.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private orderServerService: OrderServerService) { }

  public sendOrder(deliveryAddress: string, deliveryName: string, email: string, paymentType: PaymentType, phone: string, productItems: ItemOrderDto[], id?: number, orderStatus?: OrderStatus, text?: string) {
    const dto: ProductOrderDto = {
      deliveryAddress,
      deliveryName,
      email,
      paymentType,
      phone,
      productItems,
      id,
      orderStatus,
      text
    };
    return this.orderServerService.post(dto);
  }
}
