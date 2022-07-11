import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsModalContentComponent } from './reviews-modal-content.component';

describe('ReviewsModalContentComponent', () => {
  let component: ReviewsModalContentComponent;
  let fixture: ComponentFixture<ReviewsModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
