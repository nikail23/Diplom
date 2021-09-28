import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set slide', () => {
    component.setSlide(2);
    expect(component.activeSlideNumber).toBe(2);
  });

  it('should render slides', () => {
    let i = 0;
    const headers = fixture.debugElement.queryAll(By.css('.slider__header'));
    component.slides.forEach(slide => {
      component.setSlide(i);
      fixture.detectChanges();
      expect(headers[i].nativeElement.innerText).toBe(slide.header);
      i++;
    });
  });

  it('should render catalog preview', () => {
    let i = 0;
    fixture.detectChanges();
    const names = fixture.debugElement.queryAll(By.css('.flower__header'));
    component.randomEightflowers.forEach(flower => {
      expect(names[i].nativeElement.innerText).toBe(flower.name);
      i++;
    });
  });
});
