import { Component } from '@angular/core';
import { Path } from '../../classes/path';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'Catalog', routerLink: '/catalog' },
  ];
}
