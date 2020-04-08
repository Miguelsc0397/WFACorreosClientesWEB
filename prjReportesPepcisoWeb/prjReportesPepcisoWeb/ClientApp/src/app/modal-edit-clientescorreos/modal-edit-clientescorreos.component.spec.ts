import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditClientescorreosComponent } from './modal-edit-clientescorreos.component';

describe('ModalEditClientescorreosComponent', () => {
  let component: ModalEditClientescorreosComponent;
  let fixture: ComponentFixture<ModalEditClientescorreosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditClientescorreosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditClientescorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
