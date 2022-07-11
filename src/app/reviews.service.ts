import { Injectable } from '@angular/core';
import { items } from './items';
import { reviewsList } from './mock-reviews';
import { reviews } from './reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { }
  getReviews(itemsName : string) : reviews[] {
    reviewsList.find((reviews) => reviews.itemName = itemsName);
    return reviewsList
  }
  addReviews(review : reviews): void{
    reviewsList.push(review);
  }
}
