import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  id !: number
  myForm!: FormGroup;
  newReviews !: reviews;
  itemsName !: string 
  private sub: any;
  reviewsList = this.reviewsService.getReviews();
  constructor(private modalService: NgbModal, private reviewsService : ReviewsService, private nameCheckerPipe : NameCheckerPipe, private route: ActivatedRoute, private fb :FormBuilder) {}

  ngOnInit(): void {
    console.log(items);
    console.log(this.id)
    this.reviewsList = this.reviewsList.filter((reviews)=> reviews.itemsId === this.id)
    this.myForm = this.fb.group({
      username : '',
      description : '',
      itemsName : this.items.name
    })
  }
  open(content: any) {
     this.modalService.open(content);
    // modalRef.componentInstance.items = this.items;
    // console.log(this.items);
    // this.itemsName = itemsName;
    

  }
  onSubmit(items : items){
    this.newReviews = new reviews();
    this.newReviews.username = this.myForm.value.username;
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemsId = this.items.id;
    this.reviewsService.addReviews(this.newReviews).subscribe((data) => {this.reviewsList.push(data)});
    this.myForm.reset;
    alert("added reviews")
    console.log(this.newReviews)
    console.log(this.reviewsList)
  }
  
}
