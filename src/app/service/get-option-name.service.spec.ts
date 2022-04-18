import { TestBed } from '@angular/core/testing';

import { GetOptionNameService } from './get-option-name.service';

describe('GetOptionNameService', () => {
  let service: GetOptionNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOptionNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
