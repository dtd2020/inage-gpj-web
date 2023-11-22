import { TestBed } from '@angular/core/testing';

import { HttpParamsUtilService } from './http-params-util.service';

describe('HttpParamsUtilService', () => {
  let service: HttpParamsUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpParamsUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
