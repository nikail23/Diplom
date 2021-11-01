import { priceHistoryDialogWidth, priceHistoryMobileDialogHeight, priceHistoryMobileDialogWidth } from './../../classes/global-variables';
import { PriceHistoryDialogComponent } from './../price-history-dialog/price-history-dialog.component';
import { CartService } from '../../services/cart.service';
import { SafeUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../classes/path';
import { Flower } from '../../classes/flower';
import { CatalogService } from 'src/app/services/catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { priceHistoryDialogHeight } from 'src/app/classes/global-variables';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public paths: Path[] = [];

  public currentFlower?: Flower;
  public images: (SafeUrl | undefined)[] = [];
  public currentImage?: SafeUrl = this.images[0];

  constructor(
    public activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.catalogService.get(id).subscribe((flower: Flower) => {
      this.currentFlower = flower;
      this.paths = [
        { name: 'Home', routerLink: '/home' },
        { name: 'Catalog', routerLink: '/catalog' },
        {
          name: this.currentFlower.name,
          routerLink: `/catalog/${this.currentFlower.id}`,
        },
      ];
      this.images.push(this.currentFlower?.loadedPhoto);
      this.images.push(this.currentFlower?.loadedPhoto);
      this.images.push(this.currentFlower?.loadedPhoto);
      this.currentImage = this.images[0];
      this.cartService.setInCartFlowerState(this.currentFlower);
    });
  }

  public addToCartButtonClicked(flower?: Flower) {
    if (flower && !flower.inCart) {
      this.cartService.add(flower.id).subscribe(() => {
        this.cartService.setInCartFlowerState(flower);
      });
    }
  }

  public openPriceHistoryDialog() {
    let height, minWdith;
    if (window.innerWidth > 1024) {
      height = priceHistoryDialogHeight;
      minWdith = priceHistoryDialogWidth;
    } else {
      height = priceHistoryMobileDialogHeight;
      minWdith = priceHistoryMobileDialogWidth;
    }
    this.dialog.open(PriceHistoryDialogComponent, {
      height: height,
      minWidth: minWdith,
      data: {
        id: this.currentFlower?.id
      }
    });
  }
}
