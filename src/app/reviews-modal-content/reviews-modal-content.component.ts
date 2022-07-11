import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalContentComponent } from '../add-review-modal-content/add-review-modal-content.component';
import { items } from '../items';
import { reviews } from '../reviews';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-reviews-modal-content',
  templateUrl: './reviews-modal-content.component.html',
  styleUrls: ['./reviews-modal-content.component.css'],
})
export class ReviewsModalContentComponent implements OnInit {
  items!: items;
  itemsName !: string 
  constructor(private modalService: NgbModal, private reviewsService : ReviewsService) {}

  ngOnInit(): void {
    console.log(items);
  }
  openModal(itemsName : string) {
    const modalRef = this.modalService.open(AddReviewModalContentComponent);
    modalRef.componentInstance.items = this.items;
    console.log(this.items);
    this.itemsName = itemsName;

  }
  reviewsList = this.reviewsService.getReviews(this.itemsName);
}
