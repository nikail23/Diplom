import { Flower } from './../../classes/flower';
import { getTestFlowers } from '../../testing/catalog.mock';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedTestingRoute } from '../../testing/router-testing';
import { CatalogService } from 'src/app/services/catalog.service';
import { PricePipe } from './../../pipes/price.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { cartServiceSpy } from 'src/app/testing/cart.mock';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let cartService: CartService;
  let catalogService: CatalogService;
  let flower: Flower = getTestFlowers()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      declarations: [ProductDetailsComponent, PricePipe],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: CatalogService, useValue: catalogServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedTestingRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    cartService = TestBed.inject(CartService);
    catalogService = TestBed.inject(CatalogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current flower', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.currentFlower).toEqual(flower);
  }));

  it('should call cart service method on button click', () => {
    component.ngOnInit();
    if (component.currentFlower?.inCart) {
      component.currentFlower['inCart'] = false;
    }
    component.addToCartButtonClicked(component.currentFlower);
    fixture.detectChanges();
    expect(cartService.add).toHaveBeenCalled();
    expect(cartService.setInCartFlowerState).toHaveBeenCalled();
  });
});
