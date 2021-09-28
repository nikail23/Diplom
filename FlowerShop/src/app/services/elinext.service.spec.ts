import { TestBed } from '@angular/core/testing';

import { ElinextService } from './elinext.service';

describe('ElinextService', () => {
  let service: ElinextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElinextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
