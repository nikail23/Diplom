import { Injectable } from '@angular/core';
import { Article, articles } from '../classes/article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articles: Article[] = articles;

  public get(id: number): Article | undefined {
    let article: Article | undefined;

    this.articles.forEach((value) => {
      if (value.id === id) {
        article = value;
      }
    });
    return article;
  }

  public getAll(): Article[] {
    return this.articles;
  }
}
