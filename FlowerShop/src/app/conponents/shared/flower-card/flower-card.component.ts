import { CartService } from '../../../services/cart.service';
import { Component, Input } from '@angular/core';
import { Flower } from '../../../classes/flower';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.scss'],
})
export class FlowerCardComponent {
  @Input() flower?: Flower;

  constructor(private cartService: CartService) {}

  public addToCartButtonClicked(flower?: Flower) {
    if (flower && !flower.inCart) {
      this.cartService.add(flower.id).subscribe(() => {
        this.cartService.setInCartFlowerState(flower);
      });
    }
  }
}
