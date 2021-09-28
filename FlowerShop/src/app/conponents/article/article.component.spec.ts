import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticleComponent } from './article.component';
import { of } from 'rxjs';
import { articles } from '../news/article';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ArticleComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializing', () => {
    expect(component.htmlToAdd).toBe(articles[1].fullContent);
  });
});
