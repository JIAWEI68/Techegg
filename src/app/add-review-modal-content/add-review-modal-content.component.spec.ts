import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewModalContentComponent } from './add-review-modal-content.component';

describe('AddReviewModalContentComponent', () => {
  let component: AddReviewModalContentComponent;
  let fixture: ComponentFixture<AddReviewModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
