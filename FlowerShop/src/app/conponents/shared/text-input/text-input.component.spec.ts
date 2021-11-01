import { ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextInputComponent } from './text-input.component';
import { By } from '@angular/platform-browser';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle inputs', () => {
    const required = true;
    const control = new FormControl('', Validators.required);
    const labelText = 'Name';

    component.required = required;
    component.control = control;
    component.labelText = labelText;

    fixture.detectChanges();

    const requiredCheck = fixture.debugElement.query(
      By.css('.label_type_star')
    );
    const label = fixture.debugElement.query(By.css('.label'));

    if (required) {
      expect(requiredCheck).toBeTruthy();
      expect(label.nativeElement.innerText).toBe(labelText + ' *');
    } else {
      expect(label.nativeElement.innerText).toBe(labelText);
    }

    fixture.detectChanges();
    expect(component.control).toEqual(control);
  });
});
