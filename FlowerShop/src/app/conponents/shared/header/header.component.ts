import { UserService } from './../../../services/user.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { ElinextService } from './../../../services/elinext.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemOrderDto } from 'src/app/services/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLogged?: boolean;
  public isMenuActive: boolean = false;
  public cartFlowersInfo?: ItemOrderDto[];

  constructor(
    private scrollService: ScrollService,
    private elinext: ElinextService,
    public userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedState().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
    this.cartService.cartRefreshed.subscribe((value) => {
      this.cartFlowersInfo = value;
    });
  }

  public logInButtonClick() {
    this.userService.logIn();
  }

  public logOutButtonClick() {
    this.userService.logOut();
  }

  public sidebarLabelClick() {
    if (this.scrollService.isHide === true) {
      this.scrollService.show();
    } else {
      this.scrollService.hide();
    }
  }

  public crossButtonClick(event: string) {
    if (event === 'checked') {
      this.scrollService.show();
    } else {
      this.scrollService.hide();
    }
  }

  public selectPage() {
    this.scrollService.show();
  }

  public logoClick() {
    this.elinext.redirectToElinext();
  }

  public openSearchDialog() {
    if (window.innerWidth > 1024) {
      this.dialog.open(SearchDialogComponent, {
        height: '100vh',
        minWidth: '100vw',
        backdropClass: 'backdrop'
      });
    } else {
      this.router.navigate(['/search']);
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      return true;
    }
    return false;
  }
}
