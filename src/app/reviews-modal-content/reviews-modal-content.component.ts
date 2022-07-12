import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalContentComponent } from '../add-review-modal-content/add-review-modal-content.component';
import { items } from '../items';
import { reviews } from '../reviews';
import { ReviewsService } from '../reviews.service';
import { NameCheckerPipe } from './name-checker.pipe';

@Component({
  providers : [NameCheckerPipe],
  selector: 'app-reviews-modal-content',
  templateUrl: './reviews-modal-content.component.html',
  styleUrls: ['./reviews-modal-content.component.css'],
})
export class ReviewsModalContentComponent implements OnInit {
  items!: items;
  itemsName !: string 
  private sub: any;
  id : number = 0;
  reviewsList = this.reviewsService.getReviews();
  constructor(private modalService: NgbModal, private reviewsService : ReviewsService, private nameCheckerPipe : NameCheckerPipe, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(items);
    this.reviewsList = this.nameCheckerPipe.transform(this.reviewsList, this.id);
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }
  openModal(itemsName : string) {
    const modalRef = this.modalService.open(AddReviewModalContentComponent);
    modalRef.componentInstance.items = this.items;
    console.log(this.items);
    this.itemsName = itemsName;

  }
  
}
