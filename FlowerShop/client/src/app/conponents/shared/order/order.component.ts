import { Flower } from 'src/app/classes/flower';
import { CatalogService } from 'src/app/services/catalog.service';
import { ProductOrderDto, OrderStatus, PaymentType } from './../../../classes/order';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public readonly OrderStatus = OrderStatus;
  public readonly PaymentType = PaymentType;

  @Input() order?: ProductOrderDto;

  public orderAmountCalculating: number = 0;
  public flowersCalculatings: {price: number, amount: number, count: number}[] = [];

  public flowers: Flower[] = [];

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.calculateAmounts();
  }

  private calculateAmounts() {
    this.orderAmountCalculating = 0;
    this.getAmountObservables().subscribe((flowers) => {
      this.flowers = flowers;
      flowers.forEach(flower => {
        const flowerCount = this.getOrderFlowerCount(flower.id);
        const fullFlowerAmount = flower.priceDto.price * flowerCount;
        this.orderAmountCalculating += fullFlowerAmount;
        this.flowersCalculatings.push({
          price: flower.priceDto.price,
          amount: fullFlowerAmount,
          count: flowerCount
        });
      });
    });
  }

  private getOrderFlowerCount(itemId: number) {
    let count: number = 0;

    this.order?.productItems.forEach(item => {
      if (item.itemId === itemId) {
        count = item.quantity;
      }
    });

    return count;
  }

  private getAmountObservables(): Observable<Flower[]> {
    const requests$: Observable<Flower>[] = [];

    this.order?.productItems.forEach(item => {
      requests$.push(this.catalogService.get(item.itemId))
    });

    return forkJoin(requests$);
  }

}
