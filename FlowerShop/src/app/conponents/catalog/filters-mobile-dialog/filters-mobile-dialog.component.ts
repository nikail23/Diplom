import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { additionalFiltersNames, categoriesNames } from '../catalog-mock';

@Component({
  templateUrl: './filters-mobile-dialog.component.html',
  styleUrls: ['./filters-mobile-dialog.component.scss']
})
export class FiltersMobileDialogComponent implements OnInit {

  public fromValue: number = 0;
  public toValue: number = 100;

  options: Options = {
    floor: 0,
    ceil: 200
  };

  public categoriesNames = categoriesNames;
  public additionalFiltersNames = additionalFiltersNames;

  constructor(public dialogRef: MatDialogRef<FiltersMobileDialogComponent>) { }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

}
