import { Component, OnInit } from '@angular/core';
import { Path } from '../shared/navigation/path';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  public readonly paths: Path[] = [
    {name: 'Home', routerLink: '/home'},
    {name: 'About us', routerLink: '/about-us'},
  ];
}
