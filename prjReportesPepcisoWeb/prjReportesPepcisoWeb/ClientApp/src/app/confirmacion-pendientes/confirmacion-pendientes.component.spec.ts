import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPendientesComponent } from './confirmacion-pendientes.component';

describe('ConfirmacionPendientesComponent', () => {
  let component: ConfirmacionPendientesComponent;
  let fixture: ComponentFixture<ConfirmacionPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
