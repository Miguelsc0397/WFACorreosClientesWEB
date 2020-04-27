import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionDivisionComponent } from './confirmacion-division.component';

describe('ConfirmacionDivisionComponent', () => {
  let component: ConfirmacionDivisionComponent;
  let fixture: ComponentFixture<ConfirmacionDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
