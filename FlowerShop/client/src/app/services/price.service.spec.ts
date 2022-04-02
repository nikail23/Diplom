import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { testPriceDto } from '../testing/price.mock';

import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PriceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get price', () => {
    const itemId = 0;

    service.get(itemId).subscribe((price) => {
      expect(price).toEqual([testPriceDto]);
    });

    const getPrice = httpController.expectOne(environment.api.url + `price/${itemId}`);

    expect(getPrice.request.method).toEqual('GET');

    getPrice.flush([testPriceDto]);
  });
});
