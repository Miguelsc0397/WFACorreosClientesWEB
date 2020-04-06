import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionEditComponent } from './confirmacion-edit.component';

describe('ConfirmacionEditComponent', () => {
  let component: ConfirmacionEditComponent;
  let fixture: ComponentFixture<ConfirmacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
