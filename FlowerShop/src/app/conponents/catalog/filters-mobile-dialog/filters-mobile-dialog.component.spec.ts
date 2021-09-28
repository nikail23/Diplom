import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMobileDialogComponent } from './filters-mobile-dialog.component';

describe('FiltersMobileDialogComponent', () => {
  let component: FiltersMobileDialogComponent;
  let fixture: ComponentFixture<FiltersMobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersMobileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersMobileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
