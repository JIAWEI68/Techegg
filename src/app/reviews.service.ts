import { Injectable } from '@angular/core';
import { items } from './items';
import { reviewsList } from './mock-reviews';
import { reviews } from './reviews';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }
  getReviews() : reviews[] {
    return reviewsList
  }
  addReviews(review : reviews): Observable<reviews>{
    reviewsList.push(review);
    return of(review)
  }
  editReviews(review : reviews) : Observable<reviews>{
    reviewsList[reviewsList.findIndex(x => review.username)] = review;
    return of(review)
  }}
