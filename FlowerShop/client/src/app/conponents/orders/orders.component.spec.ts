import { getTestProductOrderDto } from '../../testing/order.mock';
import { OrderService } from 'src/app/services/order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { orderServiceSpy } from 'src/app/testing/order.mock';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderService: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: OrderService, useValue: orderServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    orderService = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on ngOnInit', () => {
    component.ngOnInit();
    expect(orderService.getUserOrders).toHaveBeenCalled();
    expect(component.orders).toEqual([getTestProductOrderDto()]);
  });
});
