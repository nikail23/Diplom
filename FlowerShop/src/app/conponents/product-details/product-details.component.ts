import { CartService } from '../../services/cart.service';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription, timer } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../shared/navigation/path';
import { Flower } from '../home/flower';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public paths: Path[] = [];

  public currentFlower?: Flower;
  public images: (SafeUrl | undefined)[] = [];
  public currentImage?: SafeUrl = this.images[0];

  private subscription: Subscription = Subscription.EMPTY;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService,
    private cartManagerService: CartService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);
      this.catalogService.get(id).subscribe((flower: Flower) => {
        this.currentFlower = flower;
        this.paths = [
          {name: 'Home', routerLink: '/home'},
          {name: 'Catalog', routerLink: '/catalog'},
          {name: this.currentFlower.name, routerLink: `/catalog/${this.currentFlower.id}`},
        ];
        this.images.push(this.currentFlower?.loadedPhoto);
        this.images.push(this.currentFlower?.loadedPhoto);
        this.images.push(this.currentFlower?.loadedPhoto);
        this.currentImage = this.images[0];
        this.cartManagerService.setInCartFlowerState(this.currentFlower);
      });
    });
  }

  public addToCartButtonClicked(flower?: Flower) {
    if (flower && !flower.inCart) {
      this.cartManagerService.add(flower.id);
      this.cartManagerService.setInCartFlowerState(flower);
    }
  }
}
