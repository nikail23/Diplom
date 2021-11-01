import { categoriesServiceSpy, getTestCategoriesResponse } from '../../../testing/categories.mock';
import { By } from '@angular/platform-browser';
import { CategoriesService } from './../../../services/categories.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import {  } from 'src/app/testing/categories.mock';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: CategoriesService, useValue: categoriesServiceSpy}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get categories response on ngOnInit', () => {
    component.ngOnInit();
    expect(categoriesService.getAll).toHaveBeenCalled();
  });

  it('should render categories template', () => {
    component.categories = getTestCategoriesResponse().content;
    fixture.detectChanges();
    const categories = fixture.debugElement.queryAll(By.css('.category'));
    const categoryName = fixture.debugElement.query(By.css('.category__header'));
    const categoryDescription = fixture.debugElement.query(By.css('.category__description'));
    expect(categories.length).toEqual(1);
    expect(categoryName.properties.innerText).toEqual('Category 0');
    expect(categoryDescription.properties.innerText).toEqual('Description 0');
  });
});
