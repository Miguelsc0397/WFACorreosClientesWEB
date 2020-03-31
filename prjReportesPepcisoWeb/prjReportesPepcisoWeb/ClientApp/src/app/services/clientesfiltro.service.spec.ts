import { TestBed } from '@angular/core/testing';

//import { EmployeeService } from './employee.service';
import { ClientesFiltroService } from './clientesfiltro.service';

describe('ClientesFiltroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: ClientesFiltroService = TestBed.get(ClientesFiltroService);
    expect(service).toBeTruthy();
  });
});
