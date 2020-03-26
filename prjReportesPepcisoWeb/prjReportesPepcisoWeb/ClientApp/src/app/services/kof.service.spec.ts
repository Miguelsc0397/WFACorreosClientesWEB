import { TestBed } from '@angular/core/testing';

import { KOFService } from './kof.service';

describe('KOFService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KOFService = TestBed.get(KOFService);
    expect(service).toBeTruthy();
  });
});
