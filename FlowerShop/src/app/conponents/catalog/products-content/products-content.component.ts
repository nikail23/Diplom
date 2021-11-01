import { map } from 'rxjs/operators';
import {
  FiltersParameters,
  sorts,
  SortParameters,
} from './../../../classes/products-parameters';
import { CategoriesResponseDto } from './../../../classes/categories';
import { CategoriesService } from './../../../services/categories.service';
import {
  filtersMobileDialogWidth,
  sliderDefaultCeil,
  sliderDefaultFloor,
  sliderDefaultFromValue,
  sliderDefaultToValue,
  sortsMobileDialogHeight,
  sortsMobileDialogWidth,
} from './../../../classes/global-variables';
import { CatalogService } from 'src/app/services/catalog.service';
import { FlowersResponseDto } from './../../../classes/flower';
import {
  DirectionType,
  ProductsParameters,
  SortPropertyType,
} from '../../../classes/products-parameters';
import { CartService } from '../../../services/cart.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiltersMobileDialogComponent } from '../filters-mobile-dialog/filters-mobile-dialog.component';
import { SortsMobileDialogComponent } from '../sorts-mobile-dialog/sorts-mobile-dialog.component';
import { Observable, of } from 'rxjs';
import { filtersMobileDialogHeight } from 'src/app/classes/global-variables';

@Component({
  selector: 'app-products-content',
  templateUrl: './products-content.component.html',
  styleUrls: ['./products-content.component.scss'],
})
export class ProductsContentComponent implements OnInit {
  public readonly SortPropertyType = SortPropertyType;
  public readonly DirectionType = DirectionType;
  public readonly sorts = sorts;

  @Input() isSearch: boolean = false;
  @Input() searchWord?: string;

  public pages: number[] = [];
  public currentSort?: SortParameters;
  public isEmpty = false;
  public isLoading = false;
  public sliderData = {
    fromValue: sliderDefaultFromValue,
    toValue: sliderDefaultToValue,
    options: { floor: sliderDefaultFloor, ceil: sliderDefaultCeil },
  };
  public selectedCategoryId: number = 0;
  public flowersResponse?: FlowersResponseDto;
  public categoriesResponse?: CategoriesResponseDto;
  public productsParameters: ProductsParameters = {
    direction: DirectionType.ASC,
    page: 0,
    size: 10,
    sortProperty: SortPropertyType.NAME,
  };

  constructor(
    public dialog: MatDialog,
    public cartService: CartService,
    private catalogService: CatalogService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesService
      .getAll()
      .subscribe((response: CategoriesResponseDto) => {
        this.categoriesResponse = response;
      });
    this.getFlowers().subscribe(() => {
      this.refreshPages();
    });
    this.handleSort(this.productsParameters);
  }

  public reloadData() {
    this.getFlowers().subscribe(() => {
      this.refreshPages();
    });
  }

  private handleSort(sortParameters: SortParameters) {
    if (sortParameters.sortProperty === SortPropertyType.NAME) {
      if (sortParameters.direction == DirectionType.ASC) {
        this.currentSort = this.sorts.nameAsc;
      } else {
        this.currentSort = this.sorts.nameDesc;
      }
    } else {
      if (sortParameters.direction == DirectionType.ASC) {
        this.currentSort = this.sorts.priceAsc;
      } else {
        this.currentSort = this.sorts.priceDesc;
      }
    }
  }

  private filterSearchResult(searchResponse: FlowersResponseDto) {
    for (let i = 0; i < searchResponse.flowers.length; i++) {
      const flower = searchResponse.flowers[i];

      if (
        (this.productsParameters.minPrice ||
          this.productsParameters.minPrice === 0) &&
        (this.productsParameters.maxPrice ||
          this.productsParameters.maxPrice === 0)
      ) {
        if (
          this.productsParameters?.minPrice > flower.priceDto.price ||
          flower.priceDto.price > this.productsParameters.maxPrice
        ) {
          searchResponse.flowers.splice(i, 1);
          i--;
          continue;
        }
      }

      if (this.productsParameters.categoryId) {
        if (this.productsParameters?.categoryId[0] !== flower.category.id) {
          searchResponse.flowers.splice(i, 1);
          i--;
          continue;
        }
      }
    }

    searchResponse.response.totalPages = searchResponse.flowers.length / 8 + 1;
  }

  private getFlowers(): Observable<void> {
    if (this.isSearch) {
      return this.getSearchObservable();
    } else {
      return this.getCatalogObservable();
    }
  }

  private getCatalogObservable() {
    return this.catalogService.getAll(this.productsParameters).pipe(
      map((result) => {
        this.flowersResponse = result;
        this.cartService.setInCartFlowersState(this.flowersResponse.flowers);
        this.isEmpty = false;
        this.isLoading = false;
      })
    );
  }

  private getSearchObservable() {
    if (this.searchWord) {
      return this.catalogService.search(this.searchWord).pipe(
        map((searchResponse) => {
          this.handleSearchResponse(searchResponse);
        })
      );
    }
    this.isLoading = false;
    this.isEmpty = true;
    return of(void 0);
  }

  private handleSearchResponse(searchResponse: FlowersResponseDto) {
    this.flowersResponse = searchResponse;
    if (this.flowersResponse.flowers.length === 0) {
      this.isEmpty = true;
      this.isLoading = false;
    } else {
      this.filterSearchResult(this.flowersResponse);
      this.cartService.setInCartFlowersState(this.flowersResponse.flowers);
      this.isEmpty = false;
      this.isLoading = false;
    }
  }

  public refreshPages(): void {
    const pages: number[] = [];
    for (var i = 1; i <= this.flowersResponse?.response.totalPages; i++) {
      pages.push(i);
    }
    this.pages = pages;
  }

  public setSort(newSort: SortParameters) {
    this.currentSort = newSort;
    this.productsParameters.direction = this.currentSort.direction;
    this.productsParameters.sortProperty = this.currentSort.sortProperty;
    this.reloadData();
  }

  public changeSelectedCategory(event: { checked: true; value: number }) {
    if (event.checked) {
      this.selectedCategoryId = event.value;
    }
  }

  public applyFilters() {
    this.productsParameters.minPrice = this.sliderData.fromValue;
    this.productsParameters.maxPrice = this.sliderData.toValue;
    if (this.selectedCategoryId > 0) {
      this.productsParameters.categoryId = [this.selectedCategoryId];
    }
    this.reloadData();
  }

  public cancelFilters() {
    this.sliderData.fromValue = 0;
    this.sliderData.toValue = 200;
    this.selectedCategoryId = 0;
    delete this.productsParameters.minPrice;
    delete this.productsParameters.maxPrice;
    delete this.productsParameters.categoryId;
    this.reloadData();
  }

  public pageClick(page: number) {
    if (page > -1 && page < this.flowersResponse?.response.totalPages) {
      this.productsParameters.page = page;
      this.reloadData();
    }
  }

  public openFiltersDialog(event: any) {
    const filtersParameters: FiltersParameters = {
      minPrice: this.productsParameters.minPrice,
      maxPrice: this.productsParameters.maxPrice,
      categoryId: this.productsParameters.categoryId,
    };

    const dialog = this.dialog.open(FiltersMobileDialogComponent, {
      height: filtersMobileDialogHeight,
      minWidth: filtersMobileDialogWidth,
      data: {
        categories: this.categoriesResponse?.content,
        filtersParameters,
      },
    });

    dialog.afterClosed().subscribe((filtersParameters: FiltersParameters) => {
      if (filtersParameters) {
        if (
          (filtersParameters.minPrice || filtersParameters.minPrice === 0) &&
          (filtersParameters.maxPrice || filtersParameters.maxPrice === 0)
        ) {
          this.productsParameters.minPrice = filtersParameters.minPrice;
          this.productsParameters.maxPrice = filtersParameters.maxPrice;
        }

        if (filtersParameters.categoryId) {
          this.productsParameters.categoryId = filtersParameters.categoryId;
        }

        this.reloadData();
      }
    });
  }

  public openSortsDialog() {
    const dialog = this.dialog.open(SortsMobileDialogComponent, {
      height: sortsMobileDialogHeight,
      minWidth: sortsMobileDialogWidth,
      data: this.currentSort,
    });

    dialog.afterClosed().subscribe((sortParameters: SortParameters) => {
      if (sortParameters) {
        this.setSort(sortParameters);
      }
    });
  }
}
