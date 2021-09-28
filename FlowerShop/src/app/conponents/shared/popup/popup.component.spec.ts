import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show', () => {
    component.show('TEST', true);

    expect(component.isActive).toBeTrue();
    expect(component.response).toBe('TEST');
    expect(component.isError).toBeTrue();
  });

  it('should close', () => {
    component.show('TEST', true);
    component.close();

    expect(component.isActive).toBeFalse();
    expect(component.response).toBe('');
    expect(component.isError).toBeFalse();
  });

  it('should close by click', () => {
    component.show('TEST', true);
    const button = fixture.debugElement.query(By.css('.popup__button_type_close'));
    button.triggerEventHandler('click', null);

    expect(component.isActive).toBeFalse();
    expect(component.response).toBe('');
    expect(component.isError).toBeFalse();
  });
});
