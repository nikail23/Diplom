import { articleServiceSpy } from '../../testing/article.mock';
import { ArticlesService } from 'src/app/services/articles.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ArticleComponent } from './article.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { articles } from 'src/app/classes/article';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ArticleComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {id: 0}
            }
          }
        },
        {provide: ArticlesService, useValue: articleServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    articlesService = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current article', () => {
    expect(component.htmlToAdd).toBe(articles[0].fullContent);
  });
});
