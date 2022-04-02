import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../classes/article';

@Component({
  selector: 'app-pagination-list',
  templateUrl: './pagination-list.component.html',
  styleUrls: ['./pagination-list.component.scss'],
})
export class PaginationListComponent implements OnInit {
  @Input() articles: Article[] = [];
  @Input() perPage: number = 4;

  public pages: number[] = [];
  public currentPage: number = 1;
  public pagesCount: number = 0;
  public currentArticles: Article[] = [];

  ngOnInit() {
    this.refreshPagesCount();
    this.refreshCurrentArticles();
    this.refreshPages();
  }

  private refreshCurrentArticles() {
    this.currentArticles = this.articles.slice(
      (this.currentPage - 1) * this.perPage,
      this.currentPage * this.perPage
    );
  }

  private refreshPagesCount() {
    this.pagesCount = Math.ceil(this.articles.length / this.perPage);
  }

  private setCurrentPage(page: number) {
    this.currentPage = page;
  }

  private refreshPages(): void {
    const pages: number[] = [];
    for (var i = 1; i <= this.pagesCount; i++) {
      pages.push(i);
    }
    this.pages = pages;
  }

  public perPageChange(perPage: number) {
    this.perPage = perPage;
    this.refreshPagesCount();
    this.refreshCurrentArticles();
    this.refreshPages();
  }

  public pageClick(page: number) {
    this.setCurrentPage(page);
    this.refreshCurrentArticles();
  }
}
