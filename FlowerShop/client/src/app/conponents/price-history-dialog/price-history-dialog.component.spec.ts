import { ChartModule } from 'angular-highcharts';
import { CatalogService } from 'src/app/services/catalog.service';
import { PriceService } from './../../services/price.service';
import { PricePipe } from './../../pipes/price.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChartTimeType,
  PriceHistoryDialogComponent,
} from './price-history-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { priceServiceSpy } from 'src/app/testing/price.mock';
import { catalogServiceSpy } from 'src/app/testing/catalog.mock';

describe('PriceHistoryDialogComponent', () => {
  let component: PriceHistoryDialogComponent;
  let fixture: ComponentFixture<PriceHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceHistoryDialogComponent, PricePipe],
      imports: [MatDialogModule, HttpClientTestingModule, ChartModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: 0 } },
        { provide: MatDialogRef, useValue: {} },
        { provide: PriceService, useValue: priceServiceSpy },
        { provide: CatalogService, useValue: catalogServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change chart time type', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.time-type__button'));
    buttons[1].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.selectedChartTimeType).toBe(ChartTimeType.SIX_MONTH);
  });

  it('should render current price', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const currentPriceLabel = fixture.debugElement.query(By.css('.current-price'));
    expect(currentPriceLabel.nativeElement.innerText).toBe('Current price: €0.0 EUR');
  });
});
