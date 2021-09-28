import { ArticlesService } from 'src/app/services/articles.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Article } from '../news/article';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Path } from '../shared/navigation/path';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, OnDestroy {

  public paths: Path[] = []
  public htmlToAdd: string = '';

  private subscription: Subscription = Subscription.EMPTY;

  constructor(private articlesService: ArticlesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      const id = Number(params['id']);
      if (id || id === 0) {
        const currentArticle = this.articlesService.get(id);
        this.paths = [
          {name: 'Home', routerLink: '/home'},
          {name: 'News', routerLink: '/news'},
          {name: currentArticle.header, routerLink: `/news/${currentArticle.id}`},
        ]
        this.htmlToAdd = currentArticle.fullContent;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
