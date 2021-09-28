import { PopupComponent } from './../../shared/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { ViewChild } from '@angular/core';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ContactUsComponent, PopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show errors', () => {
    component.form.setValue({
      name: '',
      phone: '',
      text: '',
    });
    component.sendMessageButtonClick();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('.form__error'));

    expect(errors.length).toBe(3);
  });

  it('should set errors styles', () => {
    component.form.setValue({
      name: '',
      phone: '',
      text: '',
    });
    component.sendMessageButtonClick();
    fixture.detectChanges();

    const containers = fixture.debugElement.queryAll(
      By.css('.form__container_style_error')
    );

    expect(containers.length).toBe(3);
  });
});
