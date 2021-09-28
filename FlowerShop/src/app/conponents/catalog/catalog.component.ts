import { Flower } from './../home/flower';
import { Component, OnInit } from '@angular/core';
import { Path } from '../shared/navigation/path';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],

})
export class CatalogComponent implements OnInit {

  public readonly paths: Path[] = [
    {name: 'Home', routerLink: '/home'},
    {name: 'Catalog', routerLink: '/catalog'}
  ];

  public flowers: Flower[] = [];
  public response: any = {};
  public isLoading: boolean = false;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.isLoading = true;
    this.catalogService.getAll().subscribe((result) => {
      this.flowers = result.flowers;
      this.isLoading = false;
    });
  }
}
