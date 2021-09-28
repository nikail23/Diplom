import { CartService } from '../../services/cart.service';
import { Flower } from './flower';
import { Component, OnInit } from '@angular/core';
import { Slide, slides } from './slide';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public activeSlideNumber: number = 0;

  public slides: Slide[] = slides;
  public randomEightflowers: Flower[] = [];

  constructor(
    private catalogService: CatalogService,
    private cartManagerService: CartService
  ) {}

  ngOnInit(): void {
    this.getRandomProducts(8);
  }

  public setSlide(slideNumber: number): void {
    if (slideNumber >= 0 && slideNumber <= 3) {
      this.activeSlideNumber = slideNumber;
    }
  }

  private getRandomProducts(count: number) {
    this.catalogService.getAll().subscribe((result) => {
      while (count > 0 && result.flowers.length > 0) {
        const randomIndex = Math.floor(Math.random() * result.flowers.length);
        this.randomEightflowers.push(result.flowers[randomIndex]);
        result.flowers.splice(randomIndex, 1);
        count--;
      }
      this.cartManagerService.setInCartFlowersState(this.randomEightflowers);
    });
  }
}
