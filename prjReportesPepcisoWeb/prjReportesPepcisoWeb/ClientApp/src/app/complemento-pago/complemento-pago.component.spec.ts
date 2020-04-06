import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementoPagoComponent } from './complemento-pago.component';

describe('ComplementoPagoComponent', () => {
  let component: ComplementoPagoComponent;
  let fixture: ComponentFixture<ComplementoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
