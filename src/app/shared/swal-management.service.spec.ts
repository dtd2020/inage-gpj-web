import { TestBed } from '@angular/core/testing';

import { SwalManagementService } from './swal-management.service';

describe('SwalManagementService', () => {
  let service: SwalManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
