export interface ItemOrderDto {
  id?: number;
  itemId: number;
  priceId: number;
  quantity: number;
}

export interface ShoppingCartDto {
  finished: boolean;
  id?: number;
  orderItems: ItemOrderDto[];
  text: string;
}
