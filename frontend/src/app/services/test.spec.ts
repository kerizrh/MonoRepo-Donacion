import { TestBed } from '@angular/core/testing';

import { Test } from './test';

describe('Test', () => {
  let service: Test;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Test);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
