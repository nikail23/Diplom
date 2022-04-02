import { Router, RouterModule } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [Router],
    });
    guard = TestBed.inject(AuthGuard);
  });
});
