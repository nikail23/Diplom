import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossButtonComponent } from './cross-button.component';

describe('CrossButtonComponent', () => {
  let component: CrossButtonComponent;
  let fixture: ComponentFixture<CrossButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrossButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set only cross', () => {
    component.isOnlyCross = true;
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container'));
    expect(container.classes.change).toBeTrue();
  });

  it('should emit clicked event', () => {
    spyOn(component.clicked, 'emit');
    component.buttonClicked();
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container'));
    expect(container.classes.change).toBeTrue();
    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
