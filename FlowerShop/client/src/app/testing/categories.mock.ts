import { of } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { CategoriesResponseDto } from '../classes/categories';

export function getTestCategoriesResponse(): CategoriesResponseDto {
  return {
    content: [
      {
        id: 0,
        name: 'Category 0',
        description: 'Description 0',
        thumbnail: '',
        photo: '',
        loadedPhoto: ''
      }
    ]
  }
}

export const categoriesServiceSpy = jasmine.createSpyObj<CategoriesService>('CategoriesService', ['getAll']);
categoriesServiceSpy.getAll.and.returnValue(of(getTestCategoriesResponse()));
