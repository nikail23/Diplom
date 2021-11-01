import { By } from '@angular/platform-browser';
import { PaymentService } from './../../services/payment.service';
import { StripeService } from './../../services/stripe.service';
import { PricePipe } from './../../pipes/price.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDialogComponent } from './payment-dialog.component';
import { stripeSpy } from 'src/app/testing/stripe.mock';
import { paymentServiceSpy } from 'src/app/testing/payment.mock';

describe('PaymentDialogComponent', () => {
  let component: PaymentDialogComponent;
  let fixture: ComponentFixture<PaymentDialogComponent>;
  let stripeService: StripeService;
  let paymentService: PaymentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [PaymentDialogComponent, PricePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            productOrderId: 0,
            amount: 0,
            isLoggedIn: true,
          },
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: StripeService,
          useValue: stripeSpy
        },
        {
          provide: PaymentService,
          useValue: paymentServiceSpy
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDialogComponent);
    stripeService = TestBed.inject(StripeService);
    paymentService = TestBed.inject(PaymentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render amount', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.payment__submit-button'));
    expect(button.properties.innerText).toBe('Pay €0.0 EUR');
  });

  it('should call initalize stripe', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(stripeService.initializeStripe).toHaveBeenCalled();
  });

  it('should call stripe getToken', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.sendPaymentRequest();
    expect(stripeService.getToken).toHaveBeenCalled();
  });
});
