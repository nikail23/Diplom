import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAndOrderComponent } from './cart-and-order.component';

describe('CartAndOrderComponent', () => {
  let component: CartAndOrderComponent;
  let fixture: ComponentFixture<CartAndOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAndOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAndOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
