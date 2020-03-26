import { TestBed } from '@angular/core/testing';

import { HDesInstService } from './hdesinst.service';

describe('HDesInstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HDesInstService = TestBed.get(HDesInstService);
    expect(service).toBeTruthy();
  });
});
