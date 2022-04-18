import { TestBed } from '@angular/core/testing';

import { GetBrowserNameService } from './get-browser-name.service';

describe('GetBrowserNameService', () => {
  let service: GetBrowserNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBrowserNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
