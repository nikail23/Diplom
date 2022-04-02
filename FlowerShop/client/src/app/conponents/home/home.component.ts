import { CartService } from '../../services/cart.service';
import { Flower } from '../../classes/flower';
import { Component, OnInit } from '@angular/core';
import { slides } from '../../classes/slide';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public activeSlideNumber: number = 0;

  public slides = slides;
  public randomEightflowers: Flower[] = [];

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getRandomProducts(8);
  }

  public setSlide(slideNumber: number): void {
    this.activeSlideNumber = slideNumber;
  }

  private getRandomProducts(count: number) {
    this.catalogService.getAll().subscribe((response) => {
      this.randomCut(count, response.flowers);
      this.cartService.setInCartFlowersState(this.randomEightflowers);
    });
  }

  private randomCut(count: number, flowers: Flower[]) {
    while (count > 0 && flowers.length > 0) {
      const randomIndex = Math.floor(Math.random() * flowers.length);
      this.randomEightflowers.push(flowers[randomIndex]);
      flowers.splice(randomIndex, 1);
      count--;
    }
  }
}
