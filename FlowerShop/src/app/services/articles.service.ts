import { Injectable } from '@angular/core';
import { Article, articles } from '../conponents/news/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = articles;

  public get(id: number): Article  {
    let article: Article = {id: -1, date: '', header: 'error', shortParagraph: 'error', fullContent: 'error'};
    this.articles.forEach(value => {
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
