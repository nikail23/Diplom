import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../classes/path';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  public paths: Path[] = [];
  public htmlToAdd: string = '';

  constructor(
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    if (id || id === 0) {
      const currentArticle = this.articlesService.get(id);
      if (currentArticle) {
        this.paths = [
          { name: 'Home', routerLink: '/home' },
          { name: 'News', routerLink: '/news' },
          {
            name: currentArticle.header,
            routerLink: `/news/${currentArticle.id}`,
          },
        ];
        this.htmlToAdd = currentArticle.fullContent;
      }
    }
  }
}
