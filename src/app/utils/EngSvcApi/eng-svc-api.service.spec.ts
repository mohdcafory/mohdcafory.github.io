import { TestBed } from '@angular/core/testing';

import { EngSvcApiService } from './eng-svc-api.service';

describe('EngSvcApiService', () => {
  let service: EngSvcApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngSvcApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
