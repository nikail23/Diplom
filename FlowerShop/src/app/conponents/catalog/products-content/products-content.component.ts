import { CartService } from '../../../services/cart.service';
import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Flower } from '../../home/flower';
import { additionalFiltersNames, categoriesNames, sortsNames } from '../catalog-mock';
import { FiltersMobileDialogComponent } from '../filters-mobile-dialog/filters-mobile-dialog.component';
import { sorts } from '../sorts';
import { SortsMobileDialogComponent } from '../sorts-mobile-dialog/sorts-mobile-dialog.component';

@Component({
  selector: 'app-products-content',
  templateUrl: './products-content.component.html',
  styleUrls: ['./products-content.component.scss']
})
export class ProductsContentComponent implements OnChanges {

  public fromValue: number = 0;
  public toValue: number = 100;

  options: Options = {
    floor: 0,
    ceil: 200
  };

  public categoriesNames = categoriesNames;
  public additionalFiltersNames = additionalFiltersNames;
  public sortsNames = sortsNames;

  @Input() flowers: Flower[] = [];
  @Input() perPage: number = 8;
  public currentFlowers: Flower[] = [];
  public pagesCount: number = 0;
  public currentPage: number = 1;
  public pages: number[] = [];

  private sorts = sorts;
  public selectedSortFunctionId: number = 0;

  @Output() flowerCLicked = new EventEmitter<any>();

  constructor(public dialog: MatDialog, public cartService: CartService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshPagesCount();
    this.refreshCurrentFlowers();
    this.refreshPages();
    this.cartService.setInCartFlowersState(this.currentFlowers);
  }

  private sortFlowers(flowers: Flower[], sortFunction: (firstFlower: Flower, secondFlower: Flower) => number): Flower[] {
    return flowers.sort(sortFunction);
  }

  private refreshCurrentFlowers() {
    const slicedFlowers = this.flowers.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
    this.currentFlowers = this.sortFlowers(slicedFlowers, this.sorts[this.selectedSortFunctionId]);
  }

  private refreshPagesCount() {
    this.pagesCount = Math.ceil(this.flowers.length / this.perPage);
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

  public sortChange() {
    this.refreshPagesCount();
    this.refreshCurrentFlowers();
    this.refreshPages();
  }

  public perPageChange(perPage: number) {
    this.perPage = perPage;
    this.refreshPagesCount();
    this.refreshCurrentFlowers();
    this.refreshPages();
  }

  public pageClick(page: number) {
    this.setCurrentPage(page);
    this.refreshCurrentFlowers();
  }

  public openFiltersDialog(event: any) {
    this.dialog.open(FiltersMobileDialogComponent, {
      height: '100vh',
      minWidth: '100vw'
    });
  }

  public openSortsDialog(event: any) {
    this.dialog.open(SortsMobileDialogComponent, {
      height: '100vh',
      minWidth: '100vw'
    });
  }
}
