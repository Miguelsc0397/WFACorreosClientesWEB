import { TestBed } from '@angular/core/testing';

//import { EmployeeService } from './employee.service';
import { FacturasRFCService } from './facturasrfc.service';

describe('FacturasRFCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: FacturasRFCService = TestBed.get(FacturasRFCService);
    expect(service).toBeTruthy();
  });
});
