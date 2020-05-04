import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCambiodivisionComponent } from './mensaje-cambiodivision.component';

describe('MensajeCambiodivisionComponent', () => {
  let component: MensajeCambiodivisionComponent;
  let fixture: ComponentFixture<MensajeCambiodivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeCambiodivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeCambiodivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
