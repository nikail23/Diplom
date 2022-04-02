import { SafeUrl } from '@angular/platform-browser';

export interface CategoryDto {
  id: number,
  name: string,
  description: string,
  thumbnail: string,
  photo: string
  loadedPhoto?: SafeUrl
}

export interface CategoriesResponseDto {
  content: CategoryDto[]
}
