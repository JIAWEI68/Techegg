import { Injectable } from '@angular/core';
import { items } from './items';
import { reviewsList } from './mock-reviews';
import { reviews } from './reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }
  getReviews() : reviews[] {
    return reviewsList
  }
  addReviews(review : reviews): void{
    reviewsList.push(review);
  }
}
