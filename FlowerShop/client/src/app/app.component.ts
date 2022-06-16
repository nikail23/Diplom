import { CartService } from 'src/app/services/cart.service';
import { ScrollService } from './services/scroll.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.userService.updateLoggedState();
    this.cartService.loadCart().subscribe(() => {});
  }

  title = 'FlowerShop';
}
