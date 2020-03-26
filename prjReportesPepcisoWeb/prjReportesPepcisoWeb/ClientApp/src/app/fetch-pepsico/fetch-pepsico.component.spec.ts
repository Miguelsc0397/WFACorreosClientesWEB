import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchPepsicoComponent } from './fetch-pepsico.component';

describe('FetchPepsicoComponent', () => {
  let component: FetchPepsicoComponent;
  let fixture: ComponentFixture<FetchPepsicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchPepsicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchPepsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
