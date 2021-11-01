import { ItemOrderDto } from 'src/app/classes/cart';

export interface ProductOrderDto {
  deliveryAddress: string;
  deliveryName: string;
  email: string;
  id?: number;
  orderStatus?: OrderStatus;
  paymentType: PaymentType;
  phone: string;
  productItems: ItemOrderDto[];
  text?: string;
}

export enum OrderStatus {
  DELIVERY = 'DELIVERY',
  ENTERING = 'ENTERING',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PROCESSED = 'PROCESSED',
  PROCESSING = 'PROCESSING',
}

export enum PaymentType {
  CARD = 'CARD',
  CASH = 'CASH',
  ONLINE = 'ONLINE',
}
