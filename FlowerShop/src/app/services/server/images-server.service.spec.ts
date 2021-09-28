import { TestBed } from '@angular/core/testing';

import { ImagesServerService } from './images-server.service';

describe('ImagesService', () => {
  let service: ImagesServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
