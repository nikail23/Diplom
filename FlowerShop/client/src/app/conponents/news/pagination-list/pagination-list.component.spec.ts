import { articles } from '../../../classes/article';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationListComponent } from './pagination-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaginationListComponent', () => {
  let component: PaginationListComponent;
  let fixture: ComponentFixture<PaginationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationListComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationListComponent);
    component = fixture.componentInstance;
    component.articles = articles;
    component.perPage = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sets input properties', () => {
    expect(component.articles).toEqual(articles);
    expect(component.perPage).toBe(4);
  });

  it('should initializing', () => {
    expect(component.pagesCount).toBe(3);
    expect(component.pages).toEqual([1, 2, 3]);
    expect(component.currentPage).toBe(1);
    expect(component.currentArticles).toEqual(articles.slice(0, 4));
  });

  it('should change page', () => {
    component.pageClick(2);
    expect(component.currentPage).toBe(2);
    expect(component.currentArticles).toEqual(articles.slice(4, 8));
  });

  it('should change perPage', () => {
    component.perPageChange(2);
    expect(component.perPage).toBe(2);
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
    expect(component.currentArticles).toEqual(articles.slice(0, 2));
  });
});
