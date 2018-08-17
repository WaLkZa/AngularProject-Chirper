import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChirpComponent } from './edit-chirp.component';

describe('EditChirpComponent', () => {
  let component: EditChirpComponent;
  let fixture: ComponentFixture<EditChirpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChirpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChirpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
