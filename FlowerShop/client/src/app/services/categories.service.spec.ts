import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from './images.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { imagesSpy } from '../testing/images.mock';
import { sanitizerSpy } from '../testing/sanitizer.mock';
import { getTestCategoriesResponse } from '../testing/categories.mock';
import { environment } from 'src/environments/environment.prod';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpController: HttpTestingController;
  let imagesService: ImagesService;
  const categoriesResponse = getTestCategoriesResponse();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ImagesService, useValue: imagesSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
    });
    service = TestBed.inject(CategoriesService);
    httpController = TestBed.inject(HttpTestingController);
    imagesService = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all categories', () => {
    service.getAll().subscribe((response) => {
      expect(response).toEqual(categoriesResponse);
      expect(imagesService.getImage).toHaveBeenCalled();
    });

    const getAll = httpController.expectOne(environment.api.url + 'categories');

    expect(getAll.request.method).toEqual('GET');

    getAll.flush(categoriesResponse);
  });

  afterEach(() => {
    httpController.verify();
  });
});
