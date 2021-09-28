import { TestBed } from '@angular/core/testing';

import { KeycloakTestingService } from './keycloak-testing.service';

describe('KeycloakTestingServiceService', () => {
  let service: KeycloakTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
