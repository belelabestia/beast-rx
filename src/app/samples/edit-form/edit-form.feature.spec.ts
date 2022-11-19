import { TestBed } from '@angular/core/testing';

import { EditFormFeature } from './edit-form.feature';

describe('EditFormFeature', () => {
  let service: EditFormFeature;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditFormFeature);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
