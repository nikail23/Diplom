import { TestBed } from '@angular/core/testing';

import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide scroll', () => {
    service.hide();
    expect(service.document.body.style.overflow).toBe('hidden');
  });

  it('should show scroll', () => {
    service.show();
    expect(service.document.body.style.overflow).toBe('auto');
  });
});
