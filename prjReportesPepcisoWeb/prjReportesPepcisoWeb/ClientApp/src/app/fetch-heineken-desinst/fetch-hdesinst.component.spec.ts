import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchHDesinstComponent } from './fetch-hdesinst.component';

describe('FetchHDesinstComponent', () => {
  let component: FetchHDesinstComponent;
  let fixture: ComponentFixture<FetchHDesinstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchHDesinstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchHDesinstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
