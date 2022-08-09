import { Injectable } from '@angular/core';
import { items } from './items';
import { reviewsList } from './mock-reviews';
import { reviews } from './reviews';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }
  url: string = "http://localhost:3000/api/reviews";
  getReviews() : reviews[] {
    return reviewsList
  }
  addReviews(review : reviews): Observable<reviews>{
    reviewsList.push(review);
    return of(review)
  }
  editReviews(review : reviews, _id : string) : Observable<reviews>{
    reviewsList[reviewsList.findIndex(x => x._id == _id)].description = review.description;
    return of(review)
  }
  deleteReviews(id: string) : Observable<reviews>{
    reviewsList.forEach((value)=>{
      if(value._id==id) reviewsList.splice(0,1);
    });
    return of()
  }
  getAllReviews(){
    return this.http.get<reviews[]>(this.url);
  }
  addReviewsDB(review : reviews){
    return this.http.post<reviews>(this.url, review);
  }
  deleteReviewsDB(_id: string){
    return this.http.delete<reviews>(this.url+"/"+_id);
  }
  updateReviewsDB(_id: string, description: string){
    return this.http.put<reviews>(this.url+"/"+_id, {description: description});
  }
}
