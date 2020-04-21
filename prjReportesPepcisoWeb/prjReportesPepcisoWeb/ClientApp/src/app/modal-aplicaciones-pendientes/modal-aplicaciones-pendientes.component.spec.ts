import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAplicacionesPendientesComponent } from './modal-aplicaciones-pendientes.component';

describe('ModalAplicacionesPendientesComponent', () => {
  let component: ModalAplicacionesPendientesComponent;
  let fixture: ComponentFixture<ModalAplicacionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAplicacionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAplicacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
