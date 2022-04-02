import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMobileDialogComponent } from './filters-mobile-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FiltersMobileDialogComponent', () => {
  let component: FiltersMobileDialogComponent;
  let fixture: ComponentFixture<FiltersMobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule],
      declarations: [FiltersMobileDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {categories: [], filtersParameters: {}} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
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
