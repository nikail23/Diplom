import { Component } from '@angular/core';
import { Path } from '../../classes/path';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'About us', routerLink: '/about-us' },
  ];
}
