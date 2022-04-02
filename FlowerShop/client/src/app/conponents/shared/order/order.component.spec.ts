import { getTestProductOrderDto } from '../../../testing/order.mock';
import { getTestFlowers } from '../../../testing/catalog.mock';
import { CatalogService } from 'src/app/services/catalog.service';
import { PricePipe } from './../../../pipes/price.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let flower = getTestFlowers()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderComponent, PricePipe ],
      imports: [HttpClientTestingModule],
      providers: [{provide: CatalogService, useValue: catalogServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.order = getTestProductOrderDto();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order flowers', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.flowers.length).toEqual(1);
    expect(component.flowers).toEqual([flower]);
  }));

  it('should calculate amounts', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.orderAmountCalculating).toEqual(0);
    expect(component.flowersCalculatings.length).toEqual(1);
    expect(component.flowersCalculatings[0].amount).toEqual(0);
    expect(component.flowersCalculatings[0].count).toEqual(0);
    expect(component.flowersCalculatings[0].price).toEqual(0);
  }));
});
