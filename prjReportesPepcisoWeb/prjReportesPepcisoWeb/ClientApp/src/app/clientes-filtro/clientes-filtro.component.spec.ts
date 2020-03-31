import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFiltroComponent } from './clientes-filtro.component';

describe('ClientesFiltroComponent', () => {
  let component: ClientesFiltroComponent;
  let fixture: ComponentFixture<ClientesFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
