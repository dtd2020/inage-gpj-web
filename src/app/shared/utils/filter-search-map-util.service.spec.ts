import { TestBed } from '@angular/core/testing';

import { FilterSearchMapUtilService } from './filter-search-map-util.service';

describe('FilterSearchMapUtilService', () => {
  let service: FilterSearchMapUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSearchMapUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
