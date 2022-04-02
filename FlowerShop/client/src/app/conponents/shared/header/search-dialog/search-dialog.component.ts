import { Router } from '@angular/router';
import { ProductsContentComponent } from './../../../catalog/products-content/products-content.component';
import { FlowersResponseDto } from './../../../../classes/flower';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CatalogService } from 'src/app/services/catalog.service';
import { timer } from 'rxjs';

@Component({
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  public flowersReponse?: FlowersResponseDto;
  public isNotFoundError: boolean = false;

  public searchControl: FormControl = new FormControl();

  @ViewChild(ProductsContentComponent) private productsContentComponent: ProductsContentComponent | undefined;

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.close();
    })
    this.searchControl.valueChanges.subscribe((value) => {
      this.search(value, 2000);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public search(value: string, delay: number): void {
    if (this.productsContentComponent) {
      this.productsContentComponent.isLoading = true;
      this.productsContentComponent.isEmpty = false;
    }
    timer(delay).subscribe(() => {
      if (value === this.searchControl.value) {
        if (this.productsContentComponent) {
          this.productsContentComponent.searchWord = value;
          this.productsContentComponent.reloadData();
        }
      }
    });
  }

  public flowerClicked() {
    this.close();
  }
}
