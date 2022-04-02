import { Flower } from 'src/app/classes/flower';
import { FlowersResponseDto } from './../classes/flower';
import { DirectionType, ProductsParameters, SortPropertyType } from './../classes/products-parameters';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from './images.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';
import { imagesSpy } from '../testing/images.mock';
import { sanitizerSpy } from '../testing/sanitizer.mock';
import { environment } from 'src/environments/environment.prod';
import { of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { getTestFlowersResponse } from '../testing/catalog.mock';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpController: HttpTestingController;
  let imagesService: ImagesService;
  let testResponse: FlowersResponseDto = getTestFlowersResponse();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ImagesService, useValue: imagesSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
    });
    service = TestBed.inject(CatalogService);
    httpController = TestBed.inject(HttpTestingController);
    imagesService = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all flowers', () => {
    service.getAll().subscribe((response) => {
      expect(response).toEqual(testResponse);
      expect(imagesService.getImage).toHaveBeenCalled();
    });

    const getAll = httpController.expectOne(environment.api.url + 'items');

    expect(getAll.request.method).toEqual('GET');

    getAll.flush(testResponse.response);
  });

  it('should get all flowers with params', () => {
    const params: ProductsParameters = {
      direction: DirectionType.ASC,
      sortProperty: SortPropertyType.NAME,
      page: 1,
      size: 10
    }

    service.getAll(params).subscribe((response) => {
      expect(response).toEqual(testResponse);
      expect(imagesService.getImage).toHaveBeenCalled();
    });

    const getAll = httpController.expectOne((request) => request.url === environment.api.url + 'items');

    expect(getAll.request.method).toEqual('GET');

    expect(getAll.request.params.get('direction')).toEqual(params.direction);
    expect(getAll.request.params.get('sortProperty')).toEqual(params.sortProperty);
    expect(getAll.request.params.get('page')?.toString()).toEqual(params.page.toString());
    expect(getAll.request.params.get('size')?.toString()).toEqual(params.size.toString());

    getAll.flush(testResponse.response);
  });

  it('should get flower', () => {
    const id = 0;

    service.get(id).subscribe((flower) => {
      expect(flower).toEqual(testResponse.flowers[0]);
      expect(imagesService.getImage).toHaveBeenCalled();
    });

    const get = httpController.expectOne(environment.api.url + `items/${id}`);

    expect(get.request.method).toEqual('GET');

    get.event(new HttpResponse<any>({body: testResponse.flowers[0]}));
  });

  it('should search flowers', () => {
    const name = 'search';

    service.search(name).subscribe((response) => {
      expect(response).toEqual({flowers: testResponse.flowers, response: {content: testResponse.flowers}});
      expect(imagesService.getImage).toHaveBeenCalled();
    });

    const search = httpController.expectOne((request) => request.url === environment.api.url + `items/search`);

    expect(search.request.method).toEqual('GET');

    expect(search.request.params.get('name')).toEqual(name);

    search.flush(testResponse.flowers);
  });

  afterEach(() => {
    httpController.verify();
  });
});
