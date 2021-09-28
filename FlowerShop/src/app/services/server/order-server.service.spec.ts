import { TestBed } from '@angular/core/testing';

import { OrderServerService } from './order-server.service';

describe('OrderServerService', () => {
  let service: OrderServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
