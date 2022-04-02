import { categoriesServiceSpy } from '../../../testing/categories.mock';
import { CatalogService } from 'src/app/services/catalog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsContentComponent } from './products-content.component';
import { KeycloakService } from 'keycloak-angular';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { keycloakSpy } from 'src/app/testing/keycloak.mock';
import { cartServiceSpy } from 'src/app/testing/cart.mock';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';
import { CategoriesService } from 'src/app/services/categories.service';

describe('ProductsContentComponent', () => {
  let component: ProductsContentComponent;
  let fixture: ComponentFixture<ProductsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      declarations: [ProductsContentComponent],
      providers: [
        { provide: KeycloakService, useValue: keycloakSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: CatalogService, useValue: catalogServiceSpy },
        { provide: CategoriesService, useValue: categoriesServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh pages correctly', () => {
    component.flowersResponse = {
      response: { totalPages: 3 },
      flowers: [],
    };
    component.refreshPages();
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should set sort correctly', () => {
    const select = fixture.debugElement.query(
      By.css('mat-select')
    ).nativeElement;
    select.click();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.currentSort).toEqual(component.sorts.nameDesc);
  });

  it('should render pages correctly', () => {
    component.flowersResponse = {
      response: { totalPages: 4 },
      flowers: [],
    };
    component.refreshPages();
    fixture.detectChanges();
    const pagesButtons = fixture.debugElement.queryAll(
      By.css('.navigation__button')
    );
    expect(pagesButtons.length).toEqual(4);
  });
});
