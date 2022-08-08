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
  editReviews(review : reviews, id : string) : Observable<reviews>{
    reviewsList[reviewsList.findIndex(x => x.id == id)].description = review.description;
    return of(review)
  }
  deleteReviews(id: string) : Observable<reviews>{
    reviewsList.forEach((value)=>{
      if(value.id==id) reviewsList.splice(0,1);
    });
    return of()
  }
}
