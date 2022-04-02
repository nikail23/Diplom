import { getTestProductOrderDto } from './../testing/order.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';

describe('OrderService', () => {
  let service: OrderService;
  let httpController: HttpTestingController;
  const productOrder = getTestProductOrderDto();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(OrderService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send order', () => {
    service.sendOrder(productOrder).subscribe((order) => {
      expect(order).toEqual(productOrder);
    });

    const sendOrder = httpController.expectOne(environment.api.url + 'order/checkout');

    expect(sendOrder.request.method).toEqual('POST');

    sendOrder.flush(productOrder);
  });

  it('should get user orders', () => {
    service.getUserOrders().subscribe((orders) => {
      expect(orders).toEqual([productOrder]);
    });

    const getOrders = httpController.expectOne(environment.api.url + 'order');

    expect(getOrders.request.method).toEqual('GET');

    getOrders.flush([productOrder]);
  });
});
