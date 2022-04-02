import { getTestFlowers } from '../../../testing/catalog.mock';
import { By } from '@angular/platform-browser';
import { Flower } from 'src/app/classes/flower';
import { RouterTestingModule } from '@angular/router/testing';
import { PricePipe } from './../../../pipes/price.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FlowerCardComponent } from './flower-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cartServiceSpy } from 'src/app/testing/cart.mock';

describe('FlowerCardComponent', () => {
  let component: FlowerCardComponent;
  let fixture: ComponentFixture<FlowerCardComponent>;
  let cartService: CartService;
  let flower: Flower = getTestFlowers()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [FlowerCardComponent, PricePipe],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerCardComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    flower.inCart = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handles input values', () => {
    component.flower = flower;
    fixture.detectChanges();
    const flowerName = fixture.debugElement.query(By.css('.flower__header'))
      .nativeElement.innerText;
    expect(flowerName).toBe(flower.name);
  });

  it('should call cart testing service on button click', () => {
    component.flower = flower;
    component.addToCartButtonClicked(component.flower);
    fixture.detectChanges();
    expect(cartService.add).toHaveBeenCalled();
  });
});
