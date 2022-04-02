import { CatalogService } from './../../services/catalog.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { KeycloakService } from 'keycloak-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';
import { cartServiceSpy } from 'src/app/testing/cart.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: CatalogService, useValue: catalogServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set slide', () => {
    component.setSlide(2);
    expect(component.activeSlideNumber).toBe(2);
  });

  it('should render slides', () => {
    let i = 0;
    const headers = fixture.debugElement.queryAll(By.css('.slider__header'));
    component.slides.forEach((slide) => {
      component.setSlide(i);
      fixture.detectChanges();
      expect(headers[i].nativeElement.innerText).toBe(slide.header);
      i++;
    });
  });
});
