import { sorts } from 'src/app/classes/products-parameters';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortsMobileDialogComponent } from './sorts-mobile-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SortsMobileDialogComponent', () => {
  let component: SortsMobileDialogComponent;
  let fixture: ComponentFixture<SortsMobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatRadioModule, FormsModule, ReactiveFormsModule],
      declarations: [SortsMobileDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: {currentSort: sorts.nameAsc}}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
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
