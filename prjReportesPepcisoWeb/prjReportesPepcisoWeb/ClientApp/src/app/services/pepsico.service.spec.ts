import { TestBed } from '@angular/core/testing';

import { PepsicoService } from './pepsico.service';

describe('PepsicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PepsicoService = TestBed.get(PepsicoService);
    expect(service).toBeTruthy();
  });
});
