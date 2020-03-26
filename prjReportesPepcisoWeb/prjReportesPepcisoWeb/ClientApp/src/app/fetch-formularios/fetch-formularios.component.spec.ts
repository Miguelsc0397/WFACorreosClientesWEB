import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchFormulariosComponent } from './fetch-formularios.component';

describe('FetchFormulariosComponent', () => {
  let component: FetchFormulariosComponent;
  let fixture: ComponentFixture<FetchFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
