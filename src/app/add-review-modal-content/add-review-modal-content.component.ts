import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { items } from '../items';
import { reviews } from '../reviews';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-add-review-modal-content',
  templateUrl: './add-review-modal-content.component.html',
  styleUrls: ['./add-review-modal-content.component.css'],
})
export class AddReviewModalContentComponent implements OnInit {
  myForm!: FormGroup;
  items !: items;
  newReviews !: reviews;
  constructor(private fb :FormBuilder, private reviewsService : ReviewsService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username : '',
      description : '',
      itemsName : this.items.name
    })
  }
  onSubmit(items : items){
    this.newReviews = new reviews();
    this.newReviews.username = this.myForm.value.username;
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemName = this.items.name;
    this.reviewsService.addReviews(this.newReviews);
    this.myForm.reset;
    alert("added reviews")
    console.log(this.reviewsService.getReviews(this.items.name))
    console.log(this.newReviews)
  }
}
