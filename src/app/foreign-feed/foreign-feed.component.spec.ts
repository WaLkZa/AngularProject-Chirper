import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignFeedComponent } from './foreign-feed.component';

describe('ForeignFeedComponent', () => {
  let component: ForeignFeedComponent;
  let fixture: ComponentFixture<ForeignFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
