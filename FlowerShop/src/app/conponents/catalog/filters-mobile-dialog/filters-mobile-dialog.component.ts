import { sliderDefaultToValue, sliderDefaultFromValue, sliderDefaultCeil, sliderDefaultFloor } from './../../../classes/global-variables';
import { FiltersParameters } from './../../../classes/products-parameters';
import { CategoryDto } from './../../../classes/categories';
import { Options } from '@angular-slider/ngx-slider';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './filters-mobile-dialog.component.html',
  styleUrls: ['./filters-mobile-dialog.component.scss'],
})
export class FiltersMobileDialogComponent implements OnInit {
  public sliderData = {
    fromValue: sliderDefaultFromValue,
    toValue: sliderDefaultToValue,
    options: {
      floor: sliderDefaultFloor,
      ceil: sliderDefaultCeil,
    }
  }

  public categories: CategoryDto[] = [];
  public selectedCategoryId: number = 0;

  public filtersParameters: FiltersParameters = {};

  constructor(
    public dialogRef: MatDialogRef<FiltersMobileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {categories: CategoryDto[], filtersParameters: FiltersParameters}
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.filtersParameters = this.data.filtersParameters;
    this.sliderData.fromValue = this.filtersParameters.minPrice ?? 0;
    this.sliderData.toValue = this.filtersParameters.maxPrice ?? 100;
    this.selectedCategoryId = this.filtersParameters?.categoryId ? this.filtersParameters.categoryId[0] : 0;
  }

  public applyFilters() {
    this.filtersParameters.minPrice = this.sliderData.fromValue;
    this.filtersParameters.maxPrice = this.sliderData.toValue;
    if (this.selectedCategoryId && this.selectedCategoryId > 0) {
      this.filtersParameters.categoryId = [this.selectedCategoryId];
    }

    this.dialogRef.close(this.filtersParameters);
  }

  public clearFilters() {
    this.sliderData.fromValue = 0;
    this.sliderData.toValue = 200;
    this.selectedCategoryId = 0;
    this.filtersParameters = {};
  }

  public close() {
    this.dialogRef.close();
  }
}
