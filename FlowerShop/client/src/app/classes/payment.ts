export enum Currency {
  EUR = "EUR"
}

export interface ChargeRequestDto {
  amount: number,
  currency: Currency,
  description: string,
  productOrderId: number,
  stripeEmail: string,
  stripeToken: string
}
