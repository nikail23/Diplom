import { TestBed } from '@angular/core/testing';

import { CartServerService } from './cart-server.service';

describe('CartService', () => {
  let service: CartServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
