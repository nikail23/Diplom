import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortsMobileDialogComponent } from './sorts-mobile-dialog.component';

describe('SortsMobileDialogComponent', () => {
  let component: SortsMobileDialogComponent;
  let fixture: ComponentFixture<SortsMobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortsMobileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortsMobileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
