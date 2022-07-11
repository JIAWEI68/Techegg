import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewsModalComponent } from './add-reviews-modal.component';

describe('AddReviewsModalComponent', () => {
  let component: AddReviewsModalComponent;
  let fixture: ComponentFixture<AddReviewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
