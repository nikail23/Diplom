import { FlowersResponseDto } from './../classes/flower';
import { CatalogService } from 'src/app/services/catalog.service';
import { Flower } from 'src/app/classes/flower';
import { of } from 'rxjs';

export function getTestFlowers(): Flower[] {
  return [
    {
      id: 0,
      category: {
        id: 0,
        name: 'name',
        description: 'description',
        thumbnail: '',
        photo: '',
      },
      name: 'name',
      description: 'description',
      priceDto: {
        id: 0,
        price: 0,
        date: 'date',
        itemId: 0,
      },
      shortDescription: 'shortDescription',
      photo: '',
      loadedPhoto: '',
      thumbnail: false,
      inCart: false,
    },
  ];
}

export function getTestFlowersResponse(): FlowersResponseDto {
  return {
    flowers: getTestFlowers(),
    response: {
      totalPages: 1,
      content: getTestFlowers()
    }
  };
}

export const catalogServiceSpy = jasmine.createSpyObj<CatalogService>('CatalogService', [
  'getAll',
  'get',
  'search',
]);
catalogServiceSpy.getAll.and.returnValue(of(getTestFlowersResponse()));
catalogServiceSpy.get.and.returnValue(of(getTestFlowers()[0]));
catalogServiceSpy.search.and.returnValue(of(getTestFlowersResponse()));
