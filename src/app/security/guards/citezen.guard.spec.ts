import { TestBed } from '@angular/core/testing';

import { CitezenGuard } from './citezen.guard';

describe('CitezenGuard', () => {
  let guard: CitezenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CitezenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
