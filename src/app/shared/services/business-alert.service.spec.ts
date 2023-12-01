import { TestBed } from '@angular/core/testing';

import { BusinessAlertComponentService } from './business-alert.service';

describe('BusinessAlertComponentService', () => {
  let service: BusinessAlertComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAlertComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
