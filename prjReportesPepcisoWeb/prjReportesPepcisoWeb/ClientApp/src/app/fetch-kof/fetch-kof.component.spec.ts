import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchKOFComponent } from './fetch-kof.component';

describe('FetchKOFComponent', () => {
  let component: FetchKOFComponent;
  let fixture: ComponentFixture<FetchKOFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchKOFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchKOFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
