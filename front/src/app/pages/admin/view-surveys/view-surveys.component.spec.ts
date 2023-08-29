import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveysComponent } from './view-surveys.component';

describe('ViewSurveysComponent', () => {
  let component: ViewSurveysComponent;
  let fixture: ComponentFixture<ViewSurveysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSurveysComponent]
    });
    fixture = TestBed.createComponent(ViewSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
