import { TestBed } from '@angular/core/testing';

import { SmService } from './sm.service';

describe('SmService', () => {
  let service: SmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
