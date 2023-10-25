import { TestBed } from '@angular/core/testing';

import { ComplainerService } from './complainer.service';

describe('ComplainerService', () => {
  let service: ComplainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
