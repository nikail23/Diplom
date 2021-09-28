import { TestBed } from '@angular/core/testing';

import { UserServerService } from './user-server.service';

describe('UserServerService', () => {
  let service: UserServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
