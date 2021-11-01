import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDialogComponent } from './search-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routerSpy } from 'src/app/testing/router.mock';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, ReactiveFormsModule],
      declarations: [SearchDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when form value changes', (done) => {
    spyOn(component, 'search');
    component.searchControl.valueChanges.subscribe(() => {
      expect(component.search).toHaveBeenCalled();
      done();
    });
    component.searchControl.patchValue({
      search: 'abc',
    });
    fixture.detectChanges();
  });
});
