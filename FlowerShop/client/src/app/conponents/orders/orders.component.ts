import { CatalogService } from './../../services/catalog.service';
import { OrderStatus, PaymentType, ProductOrderDto } from './../../classes/order';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/classes/path';
import { Flower } from 'src/app/classes/flower';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'My orders', routerLink: '/orders' },
  ];

  public orders?: ProductOrderDto[];

  constructor(private orderService: OrderService, private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe((orders: ProductOrderDto[]) => {
      this.orders = orders;
    });

    this.catalogService.get(1).subscribe((flower: Flower) => {
      this.orders = [
        {
          deliveryAddress: 'г. Минск, ул. Янки Мавра, д. 21',
          deliveryName: 'Илья',
          email: 'nikail232323232323@gmail.com',
          paymentType: PaymentType.CARD,
          phone: '+375 (29) 858-36-75',
          text: '6 подъезд, выйду и встречу вас',
          orderStatus: OrderStatus.PENDING_PAYMENT,
          productItems: [
            {
              id: 0,
              itemId: flower.id,
              priceId: flower.priceDto.id,
              quantity: 1,
            }
          ]
        }
      ];
    })
  }
}
