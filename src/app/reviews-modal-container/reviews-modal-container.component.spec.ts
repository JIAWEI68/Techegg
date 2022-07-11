import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsModalContainerComponent } from './reviews-modal-container.component';

describe('ReviewsModalContainerComponent', () => {
  let component: ReviewsModalContainerComponent;
  let fixture: ComponentFixture<ReviewsModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsModalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
