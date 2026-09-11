import { TestBed } from '@angular/core/testing';

import { CiService } from './ci.service';

describe('CiService', () => {
  let service: CiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
