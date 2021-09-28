import { sortsNames } from './../catalog-mock';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sorts-mobile-dialog',
  templateUrl: './sorts-mobile-dialog.component.html',
  styleUrls: ['./sorts-mobile-dialog.component.scss']
})
export class SortsMobileDialogComponent implements OnInit {

  public selectedSort: string = '';
  public sortsNames = sortsNames;

  constructor(public dialogRef: MatDialogRef<SortsMobileDialogComponent>) { }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

}
