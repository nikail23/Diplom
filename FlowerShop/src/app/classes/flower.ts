import { SafeUrl } from '@angular/platform-browser';

export interface PriceDto {
  id: number;
  price: number;
  date: string;
  itemId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  photo: string;
}

export interface Flower {
  category: Category;
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  priceDto: PriceDto;
  photo: string;
  loadedPhoto: SafeUrl;
  thumbnail: boolean;
  inCart: boolean;
}

export interface FlowersResponseDto {
  response: any;
  flowers: Flower[];
}
