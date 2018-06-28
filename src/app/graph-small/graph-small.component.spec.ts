import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSmallComponent } from './graph-small.component';

describe('GraphSmallComponent', () => {
  let component: GraphSmallComponent;
  let fixture: ComponentFixture<GraphSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
