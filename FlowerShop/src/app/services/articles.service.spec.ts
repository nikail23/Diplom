import { TestBed } from '@angular/core/testing';
import { articles } from '../classes/article';

import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get article', () => {
    const expectedArticle = articles[0];
    const serviceArticle = service.get(0);
    expect(serviceArticle).toEqual(expectedArticle);
  });

  it('should get all articles', () => {
    const expectedArticles = articles;
    const serviceArticles = service.getAll();
    expect(serviceArticles).toEqual(expectedArticles);
  });
});
