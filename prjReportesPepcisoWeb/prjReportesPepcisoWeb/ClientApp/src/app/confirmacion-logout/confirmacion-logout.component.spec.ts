import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionLogoutComponent } from './confirmacion-logout.component';

describe('ConfirmacionLogoutComponent', () => {
  let component: ConfirmacionLogoutComponent;
  let fixture: ComponentFixture<ConfirmacionLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
