import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from './items';
import { paymentsList } from './mock-payment';
import { payment } from './payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  url: string = "http://localhost:3000/api/payment";
  getPayments(): payment[] {
    return paymentsList;
  }
  addPayments(items: items): void {
    paymentsList.push(items);
  }
  getTotalCost(sum: number) {
    console.log(sum);
    paymentsList.forEach((a) => (sum += a.cost));
    return sum;
  }
  delete(items: items): payment[] {
    paymentsList.forEach((value) => {
      if (value === items) paymentsList.splice(0, 1);
    });
    return paymentsList;
  }
  getAllPayment(){
    return this.http.get<items[]>(this.url);
  }
  addPaymentToDB(
    id: number,
    name : string,
    description : string,
    startingPicture : string,
    descriptionPicture : string,
    priceRating : number, //number = int
    sustainabilityRating : number,
    cost : number,
    category : string,
  ) {
    return this.http.post<items>(this.url, {
      id: id,
      name: name,
      description: description,
      startingPicture: startingPicture,
      descriptionPicture: descriptionPicture,
      priceRating: priceRating,
      sustainabilityRating: sustainabilityRating,
      cost: cost,
      category: category,
    });
  }
  deletePaymentFromDB(_id: string) {
    return this.http.delete<items>(this.url + '/' + _id);
  }
}
