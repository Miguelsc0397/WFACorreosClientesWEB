import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchHeinekenInstalacionesComponent } from './fetch-heineken-inst.component';

describe('FetchHeinekenInstalacionesComponent', () => {
  let component: FetchHeinekenInstalacionesComponent;
  let fixture: ComponentFixture<FetchHeinekenInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FetchHeinekenInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchHeinekenInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
