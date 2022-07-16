import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalContentComponent } from '../add-review-modal-content/add-review-modal-content.component';
import { items } from '../items';
import { reviewsList } from '../mock-reviews';
import { reviews } from '../reviews';
import { ReviewsService } from '../reviews.service';
import { NameCheckerPipe } from './name-checker.pipe';

@Component({
  providers: [NameCheckerPipe],
  selector: 'app-reviews-modal-content',
  templateUrl: './reviews-modal-content.component.html',
  styleUrls: ['./reviews-modal-content.component.css'],
})
export class ReviewsModalContentComponent implements OnInit {
  items!: items;
  id: number = 0;
  myForm!: FormGroup;
  newReviews!: reviews;
  itemsName!: string;
  private sub: any;
  // username : string = this.newReviews.username;
  reviewsList = this.reviewsService.getReviews();
  constructor(
    private modalService: NgbModal,
    private reviewsService: ReviewsService,
    private nameCheckerPipe: NameCheckerPipe,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    console.log(items);
    console.log(this.id);
    this.reviewsList = this.reviewsList.filter(
      (reviews) => reviews.itemsId === this.id
    );
    this.myForm = this.fb.group({
      id: '',
      username: '',
      description: '',
      itemsName: this.items.name,
    });
  }
  open(content: any) {
    this.modalService.open(content);
    this.myForm.reset;
    // modalRef.componentInstance.items = this.items;
    // console.log(this.items);
    // this.itemsName = itemsName;
  }
  onSubmit(items: items) {
    this.newReviews = new reviews();
    this.newReviews.id = this.myForm.value.id;
    this.newReviews.username = this.myForm.value.username;
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemsId = this.items.id;
    this.reviewsService.addReviews(this.newReviews).subscribe((data) => {
      this.reviewsList.push(data);
    });
    this.myForm.reset;
    console.log(this.newReviews);
    console.log(this.reviewsList);
  }
  edit(content: any) {
    console.log(this.newReviews.id);
    this.modalService.open(content);
    this.myForm.reset;
  }
  onEdit(id : number, username : string) {
    this.newReviews = new reviews();
    this.newReviews.id = id;
    this.newReviews.username = username;
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemsId = this.items.id;
    this.reviewsService
      .editReviews(this.newReviews, id)
      .subscribe((data) => {
        this.reviewsList.findIndex((x) => data);
      });
  }
  delete(id : number){
    this.reviewsService.deleteReviews(id).subscribe((data) => {
      console.log(data)
    })
  }
}
