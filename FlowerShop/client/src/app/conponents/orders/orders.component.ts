import { UserService } from 'src/app/services/user.service';
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

  constructor(private orderService: OrderService, private catalogService: CatalogService, private userService: UserService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders(this.userService.userId).subscribe((orders: ProductOrderDto[]) => {
      this.orders = orders;
    });
  }
}
