import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerCardComponent } from './flower-card.component';

describe('FlowerCardComponent', () => {
  let component: FlowerCardComponent;
  let fixture: ComponentFixture<FlowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
