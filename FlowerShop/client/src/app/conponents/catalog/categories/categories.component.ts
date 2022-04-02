import { CategoryDto, CategoriesResponseDto } from './../../../classes/categories';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: CategoryDto[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((categoriesResponseDto: CategoriesResponseDto) => {
      this.categories = categoriesResponseDto.content;
    });
  }
}
