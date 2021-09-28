import { CartService } from '../../../services/cart.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flower } from '../../home/flower';

@Component({
  selector: 'app-flower-card',
  templateUrl: './flower-card.component.html',
  styleUrls: ['./flower-card.component.scss']
})
export class FlowerCardComponent implements OnInit {

  @Input() flower?: Flower;

  @Output() flowerClicked = new EventEmitter<any>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  public productClicked(): void {
    this.flowerClicked.emit();
  }

  public addToCartButtonClicked(flower?: Flower) {
    if (flower && !flower.inCart) {
      this.cartService.add(flower.id).subscribe(() => {
        this.cartService.setInCartFlowerState(flower);
      });
    }
  }
}
