import { TestBed } from '@angular/core/testing';

import { BusinessAlertService } from './business-alert.service';

describe('BusinessAlertService', () => {
  let service: BusinessAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
