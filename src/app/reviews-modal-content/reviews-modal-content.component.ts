import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AddReviewModalContentComponent } from '../add-review-modal-content/add-review-modal-content.component';
import { AuthService } from '../auth.service';
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
export class ReviewsModalContentComponent implements AfterViewChecked, OnInit {
  items!: items;
  id: number = 0;
  reviewId: number = 0;
  reviewsDBList: reviews[] = [];
  myForm!: FormGroup;
  updateForm!: FormGroup;
  newReviews!: reviews;
  itemsName!: string;
  reviews = this.reviewsDBList;
  username :string = '';
  _id :string = '0';
  i : number = 0;
  private sub: any;
  // username : string = this.newReviews.username;
  // username : string = (document.getElementById('username') as HTMLInputElement).value;
  reviewsList = this.reviewsService.getReviews();
  constructor(
    private modalService: NgbModal,
    private reviewsService: ReviewsService,
    private nameCheckerPipe: NameCheckerPipe,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.reviewsService.getAllReviews().subscribe((data) => {
      this.reviewsDBList = data.filter((reviews) => reviews.itemsId == this._id);
      console.log(this.reviewsDBList);
    });
    this.myForm = this.fb.group({
      id: '',
      username: this.authService.getSecureToken(),
      description: '',
      itemsId: this._id,
    });
    this.updateForm = this.fb.group({
      id: '',
      username: this.authService.getSecureToken(),
      description: '',
      itemsId: this._id,
    });
    this.reviewsList = this.reviewsList.filter(
      (reviews) => reviews.itemsId === this._id
    );
    console.log(reviewsList);
    console.log(this.id);
  }

  ngAfterViewChecked(): void {}
  open(content: any) {
    if (this.authService.isLoggedIn()) {
      this.modalService.open(content);
      this.myForm.reset;
    } else {
      alert('You must be logged in to add a review');
    }
  }
  onSubmit(items: items, formDirective: FormGroupDirective) {
    this.newReviews = new reviews();
    this.newReviews.username = this.authService.getSecureToken()!.toString();
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemsId = this.items._id;
    this.reviewsService.addReviewsDB(this.newReviews).subscribe((data) => {
      this.reviewsDBList.push(data);
      location.reload();
    });
    formDirective.resetForm();
    this.myForm.reset;
    console.log(this.newReviews);
    console.log(this.reviewsList);
  }
  edit(content: any, _id : string, username: string) {
    // console.log(this.newReviews.id);
   if (this.authService.isLoggedIn() && username == this.authService.getSecureToken()) {
      this.modalService.open(content);
      this.myForm.reset;
    this._id = _id;
    this.username = username;
    }
    else if(username != this.authService.getSecureToken()){
      alert('You can only edit your own reviews');
    } 
    else {
      alert('You must be logged in to edit a review');
    }
  }
  onEdit(id: string, username: string) {
    this.newReviews = new reviews();
    this.newReviews._id = id;
    this.newReviews.username = username;
    this.newReviews.description = this.myForm.value.description;
    this.newReviews.itemsId = this.items._id;
    this.reviewsService.editReviews(this.newReviews, id).subscribe((data) => {
      {
        reviewsList[this.reviewsList.indexOf(data)].description =
          data.description;
      }
    });
  }
  delete(id: string, username : string) {
  if(username === this.authService.getSecureToken()){
    this.reviewsService.deleteReviewsDB(id).subscribe((data) => {
      this.reviewsDBList.splice(this.reviewsDBList.indexOf(data), 1);
      location.reload();
    });
  }
  else{
    alert('You can only delete your own reviews');
  }
  }
  onUpdate(_id: string) {
    var description = (
      document.getElementById(_id + '_description') as HTMLInputElement
    ).value;
    this.reviewsService.updateReviewsDB(_id, description).subscribe((data) => {
      this.reviewsDBList[this.reviewsDBList.indexOf(data)] = data;
      location.reload();
    });
  }
}
