import { TestBed } from '@angular/core/testing';

import { CounterFeature } from './counter.feature';

describe('CounterFeature', () => {
  let service: CounterFeature;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterFeature);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
