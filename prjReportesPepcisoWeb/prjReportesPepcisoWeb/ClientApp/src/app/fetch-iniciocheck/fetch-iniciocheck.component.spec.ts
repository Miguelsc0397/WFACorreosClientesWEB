import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchInicioCheckComponent } from './fetch-iniciocheck.component';

describe('FetchInicioCheckComponent', () => {
  let component: FetchInicioCheckComponent;
  let fixture: ComponentFixture<FetchInicioCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchInicioCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchInicioCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
