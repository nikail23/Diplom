import { ItemOrderDto } from 'src/app/services/cart';

export interface ProductOrderDto {
  deliveryAddress: string,
  deliveryName: string,
  email: string,
  id?: number,
  orderStatus?: OrderStatus,
  paymentType: PaymentType,
  phone: string,
  productItems: ItemOrderDto[],
  text?: string
}

export enum OrderStatus {
  'DELIVERY', 'ENTERING', 'PENDING_PAYMENT', 'PROCESSED', 'PROCESSING'
}

export enum PaymentType {
  CARD = 'CARD', CASH = 'CASH', ONLINE = 'ONLINE'
}
