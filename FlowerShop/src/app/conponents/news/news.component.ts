import { Component } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Path } from '../shared/navigation/path';
import { Article, articles } from './article';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  public readonly paths: Path[] = [
    {name: 'Home', routerLink: '/home'},
    {name: 'News', routerLink: '/news'},
  ];

  public articles: Article[] = [];

  constructor(private articlesService: ArticlesService) {
    this.articles = this.articlesService.getAll();
  }
}
