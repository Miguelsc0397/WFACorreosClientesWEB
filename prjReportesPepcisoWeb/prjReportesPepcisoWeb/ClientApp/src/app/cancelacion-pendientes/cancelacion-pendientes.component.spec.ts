import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelacionPendientesComponent } from './cancelacion-pendientes.component';

describe('CancelacionPendientesComponent', () => {
  let component: CancelacionPendientesComponent;
  let fixture: ComponentFixture<CancelacionPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelacionPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelacionPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
