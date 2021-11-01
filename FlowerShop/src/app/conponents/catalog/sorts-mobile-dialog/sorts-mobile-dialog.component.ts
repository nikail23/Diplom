import { SortParameters } from './../../../classes/products-parameters';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sorts } from 'src/app/classes/products-parameters';

@Component({
  selector: 'app-sorts-mobile-dialog',
  templateUrl: './sorts-mobile-dialog.component.html',
  styleUrls: ['./sorts-mobile-dialog.component.scss'],
})
export class SortsMobileDialogComponent implements OnInit {
  public sortParameters?: SortParameters;

  public sorts = sorts;

  constructor(
    public dialogRef: MatDialogRef<SortsMobileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private inputSortParameters: SortParameters
  ) {}

  ngOnInit(): void {
    this.sortParameters = this.inputSortParameters;
  }

  public applySorts() {
    this.dialogRef.close(this.sortParameters);
  }

  public close() {
    this.dialogRef.close();
  }
}
