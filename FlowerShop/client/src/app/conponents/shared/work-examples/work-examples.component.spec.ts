import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExamplesComponent } from './work-examples.component';

describe('WorkExamplesComponent', () => {
  let component: WorkExamplesComponent;
  let fixture: ComponentFixture<WorkExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkExamplesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
