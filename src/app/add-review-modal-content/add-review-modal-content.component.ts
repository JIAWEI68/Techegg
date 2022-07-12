import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { items } from '../items';
import { ItemsService } from '../items.service';
import { reviewsList } from '../mock-reviews';
import { reviews } from '../reviews';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-add-review-modal-content',
  templateUrl: './add-review-modal-content.component.html',
  styleUrls: ['./add-review-modal-content.component.css'],
})
export class AddReviewModalContentComponent implements OnInit {
  myForm!: FormGroup;
  private sub: any;
  items !: items;
  newReviews !: reviews;
  id : number = 0;
  constructor(private fb :FormBuilder, private reviewsService : ReviewsService, private route: ActivatedRoute, private itemsService : ItemsService) {}

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
    this.newReviews.itemsId = this.items.id;
    this.reviewsService.addReviews(this.newReviews);
    this.myForm.reset;
    alert("added reviews")
    console.log(this.newReviews)
    console.log(reviewsList)
  }
}
