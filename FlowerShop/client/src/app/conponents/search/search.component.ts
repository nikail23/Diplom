import { ProductsContentComponent } from './../catalog/products-content/products-content.component';
import { FlowersResponseDto } from './../../classes/flower';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public result?: FlowersResponseDto;
  public isNotFoundError: boolean = false;

  public searchControl: FormControl = new FormControl();

  @ViewChild(ProductsContentComponent) private productsContentComponent: ProductsContentComponent | undefined;

  constructor() {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value: any) => {
      this.search(value, 2000);
    });
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
}
