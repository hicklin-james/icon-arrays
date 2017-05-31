import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrayChartComponent } from './icon-array-chart.component';

describe('IconArrayChartComponent', () => {
  let component: IconArrayChartComponent;
  let fixture: ComponentFixture<IconArrayChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconArrayChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
