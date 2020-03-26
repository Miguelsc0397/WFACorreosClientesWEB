import { TestBed } from '@angular/core/testing';

import { ChecklistazulService } from './checklistazul.service';

describe('ChecklistazulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistazulService = TestBed.get(ChecklistazulService);
    expect(service).toBeTruthy();
  });
});
