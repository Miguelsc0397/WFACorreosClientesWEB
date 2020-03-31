import { TestBed } from '@angular/core/testing';

//import { EmployeeService } from './employee.service';
import { UserLoginService } from './userlogin.service';

describe('EmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: UserLoginService = TestBed.get(UserLoginService);
    expect(service).toBeTruthy();
  });
});
