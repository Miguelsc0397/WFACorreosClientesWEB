import { TestBed } from '@angular/core/testing';

import { HeinekenInstService } from './heineken-inst.service';

describe('HeinekenInstalacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeinekenInstService = TestBed.get(HeinekenInstService);
    expect(service).toBeTruthy();
  });
});
