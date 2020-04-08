import { TestBed } from '@angular/core/testing';

import { ClientesRFCService } from './clientesrfc.service';

describe('ClientesRFCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: ClientesRFCService = TestBed.get(ClientesRFCService);
    expect(service).toBeTruthy();
  });
});
