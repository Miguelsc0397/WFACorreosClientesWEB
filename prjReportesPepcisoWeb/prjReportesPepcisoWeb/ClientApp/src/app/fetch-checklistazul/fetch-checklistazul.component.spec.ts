import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchChecklistazulComponent } from './fetch-checklistazul.component';

describe('FetchKOFComponent', () => {
  let component: FetchChecklistazulComponent;
  let fixture: ComponentFixture<FetchChecklistazulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchChecklistazulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchChecklistazulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
