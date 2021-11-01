import { ProductOrderDto } from './../../classes/order';
import { OrderService } from 'src/app/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/classes/path';

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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe((orders: ProductOrderDto[]) => {
      this.orders = orders;
    });
  }
}
